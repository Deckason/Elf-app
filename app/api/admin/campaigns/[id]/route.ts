import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { apiAuth } from "@/lib/api/auth";
import { requireRoles } from "@/lib/roleGuards";
import { Prisma, UserRole } from "@prisma/client";

// GET /api/admin/campaigns/[id] — includes inactive
export const GET = apiAuth<{ id: string }>(async (req, ctx) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN]);
  if (deny) return deny;

  try {
    const { id } = await ctx!.params;

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

    if (!campaign) {
      return NextResponse.json({ success: false, error: "Campaign not found." }, { status: 404 });
    }

    const { donations, ...rest } = campaign;
    const raisedAmount = donations.reduce((sum, d) => sum + Number(d.amount), 0);

    return NextResponse.json({ success: true, data: { ...rest, raisedAmount } });
  } catch (err) {
    console.error("[GET /api/admin/campaigns/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch campaign." }, { status: 500 });
  }
});

// PATCH /api/admin/campaigns/[id]
export const PATCH = apiAuth<{ id: string }>(async (req, ctx) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN]);
  if (deny) return deny;

  try {
    const { id } = await ctx!.params;
    const campaign = await prisma.campaign.findUnique({ where: { id } });
    if (!campaign) {
      return NextResponse.json({ success: false, error: "Campaign not found." }, { status: 404 });
    }

    const { title, description, targetAmount, isActive } = await req.json();

    const updated = await prisma.campaign.update({
      where: { id },
      data: {
        ...(title        && { title }),
        ...(description  && { description }),
        ...(targetAmount && { targetAmount: new Prisma.Decimal(targetAmount) }),
        ...(isActive     !== undefined && { isActive }),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("[PATCH /api/admin/campaigns/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to update campaign." }, { status: 500 });
  }
});

// DELETE /api/admin/campaigns/[id]
// Soft guard: refuses if donations exist unless ?force=true is passed
export const DELETE = apiAuth<{ id: string }>(async (req, ctx) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN]);
  if (deny) return deny;

  try {
    const { id } = await ctx!.params;
    const { searchParams } = new URL(req.url);
    const force = searchParams.get("force") === "true";

    const campaign = await prisma.campaign.findUnique({
      where:   { id },
      include: { _count: { select: { donations: true } } },
    });

    if (!campaign) {
      return NextResponse.json({ success: false, error: "Campaign not found." }, { status: 404 });
    }

    if (campaign._count.donations > 0 && !force) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot delete: this campaign has ${campaign._count.donations} donation(s). Pass ?force=true to delete anyway.`,
        },
        { status: 422 }
      );
    }

    if (force && campaign._count.donations > 0) {
      // Delete linked donations first to preserve referential integrity
      await prisma.$transaction([
        prisma.donation.deleteMany({ where: { campaignId: id } }),
        prisma.campaign.delete({    where: { id } }),
      ]);
    } else {
      await prisma.campaign.delete({ where: { id } });
    }

    return NextResponse.json({ success: true, message: "Campaign deleted." });
  } catch (err) {
    console.error("[DELETE /api/admin/campaigns/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to delete campaign." }, { status: 500 });
  }
});