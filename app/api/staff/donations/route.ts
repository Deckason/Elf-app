import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { apiAuth } from "@/lib/api/auth";
import { requireRoles } from "@/lib/roleGuards";
import { Prisma, UserRole } from "@prisma/client";

// GET /api/staff/donations
// Staff can view all donations for oversight/reporting.
// They cannot create or delete — that is admin territory.
export const GET = apiAuth(async (req: NextRequest & { user: any }) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN, UserRole.STAFF]);
  if (deny) return deny;

  try {
    const { searchParams } = new URL(req.url);
    const page       = Math.max(1, Number(searchParams.get("page")      ?? 1));
    const limit      = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 20)));
    const status     = searchParams.get("status")     ?? undefined;
    const projectId  = searchParams.get("projectId")  ?? undefined;
    const campaignId = searchParams.get("campaignId") ?? undefined;
    const skip       = (page - 1) * limit;

    const where: Prisma.DonationWhereInput = {
      ...(status     && { paystackStatus: status as any }),
      ...(projectId  && { projectId }),
      ...(campaignId && { campaignId }),
    };

    const [donations, total] = await Promise.all([
      prisma.donation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          donor:    { select: { fullName: true, email: true, isAnonymous: true } },
          project:  { select: { id: true, title: true, slug: true } },
          campaign: { select: { id: true, title: true } },
        },
      }),
      prisma.donation.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: donations,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("[GET /api/staff/donations]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch donations." }, { status: 500 });
  }
});