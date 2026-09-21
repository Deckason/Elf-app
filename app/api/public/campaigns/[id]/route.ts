import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// GET /api/public/campaigns/[id] — active campaigns only, no auth
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        _count:    { select: { donations: true } },
        donations: {
          where:   { paystackStatus: "SUCCESS" },
          select:  { amount: true },
          orderBy: { paidAt: "desc" },
          take: 5,
        },
      },
    });

    // Hide inactive campaigns from public entirely
    if (!campaign || !campaign.isActive) {
      return NextResponse.json({ success: false, error: "Campaign not found." }, { status: 404 });
    }

    const { donations, ...rest } = campaign;
    const raisedAmount = donations.reduce((sum, d) => sum + Number(d.amount), 0);

    return NextResponse.json({ success: true, data: { ...rest, raisedAmount } });
  } catch (err) {
    console.error("[GET /api/public/campaigns/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch campaign." }, { status: 500 });
  }
}