import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { apiAuth } from "@/lib/api/auth";
import { requireRoles } from "@/lib/roleGuards";
import { Prisma, UserRole } from "@prisma/client";

// GET /api/admin/investments — all investments across all users
export const GET = apiAuth(async (req: NextRequest & { user: any }) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN]);
  if (deny) return deny;

  try {
    const { searchParams } = new URL(req.url);
    const page      = Math.max(1, Number(searchParams.get("page")      ?? 1));
    const limit     = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 20)));
    const projectId = searchParams.get("projectId") ?? undefined;
    const userId    = searchParams.get("userId")    ?? undefined;
    const skip      = (page - 1) * limit;

    const where: Prisma.InvestmentWhereInput = {
      ...(projectId && { projectId }),
      ...(userId    && { userId }),
    };

    const [investments, total] = await Promise.all([
      prisma.investment.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          project: { select: { id: true, title: true, slug: true, status: true } },
          user:    { select: { id: true, firstName: true, lastName: true, email: true } },
        },
      }),
      prisma.investment.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: investments,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("[GET /api/admin/investments]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch investments." }, { status: 500 });
  }
});