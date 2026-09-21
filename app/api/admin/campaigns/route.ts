import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { apiAuth } from "@/lib/api/auth";
import { requireRoles } from "@/lib/roleGuards";
import { Prisma, UserRole } from "@prisma/client";

// GET /api/admin/campaigns — all campaigns including inactive
export const GET = apiAuth(async (req: NextRequest & { user: any }) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN]);
  if (deny) return deny;

  try {
    const { searchParams } = new URL(req.url);
    const page     = Math.max(1, Number(searchParams.get("page")  ?? 1));
    const limit    = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 10)));
    const search   = searchParams.get("search")   ?? undefined;
    const active   = searchParams.get("active");
    const skip     = (page - 1) * limit;

    const where: Prisma.CampaignWhereInput = {
      ...(active === "true"  && { isActive: true }),
      ...(active === "false" && { isActive: false }),
      ...(search && {
        OR: [
          { title:       { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    const [campaigns, total] = await Promise.all([
      prisma.campaign.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          _count:    { select: { donations: true } },
          donations: { where: { paystackStatus: "SUCCESS" }, select: { amount: true } },
        },
      }),
      prisma.campaign.count({ where }),
    ]);

    const enriched = campaigns.map(({ donations, ...c }) => ({
      ...c,
      raisedAmount: donations.reduce((sum, d) => sum + Number(d.amount), 0),
    }));

    return NextResponse.json({
      success: true,
      data: enriched,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("[GET /api/admin/campaigns]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch campaigns." }, { status: 500 });
  }
});

// POST /api/admin/campaigns — create a new campaign
export const POST = apiAuth(async (req: NextRequest & { user: any }) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN]);
  if (deny) return deny;

  try {
    const { title, description, targetAmount, isActive = true } = await req.json();

    if (!title || !description || !targetAmount) {
      return NextResponse.json(
        { success: false, error: "title, description, and targetAmount are required." },
        { status: 400 }
      );
    }

    if (Number(targetAmount) <= 0) {
      return NextResponse.json(
        { success: false, error: "targetAmount must be a positive number." },
        { status: 400 }
      );
    }

    const campaign = await prisma.campaign.create({
      data: { title, description, targetAmount: new Prisma.Decimal(targetAmount), isActive },
    });

    return NextResponse.json({ success: true, data: campaign }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/admin/campaigns]", err);
    return NextResponse.json({ success: false, error: "Failed to create campaign." }, { status: 500 });
  }
});