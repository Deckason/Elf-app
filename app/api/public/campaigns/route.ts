import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

// GET /api/public/campaigns — active campaigns only, no auth required
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page   = Math.max(1, Number(searchParams.get("page")  ?? 1));
    const limit  = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 10)));
    const search = searchParams.get("search") ?? undefined;
    const skip   = (page - 1) * limit;

    const where: Prisma.CampaignWhereInput = {
      isActive: true, // public always sees active only
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
    console.error("[GET /api/public/campaigns]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch campaigns." }, { status: 500 });
  }
}