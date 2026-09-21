import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { apiAuth } from "@/lib/api/auth";
import { requireRoles } from "@/lib/roleGuards";
import { Prisma, UserRole } from "@prisma/client";

// GET /api/admin/donations/[id]
export const GET = apiAuth<{ id: string }>(async (req, ctx) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN]);
  if (deny) return deny;

  try {
    const { id } = await ctx!.params;

    const donation = await prisma.donation.findUnique({
      where: { id },
      include: {
        donor:    true,
        project:  { select: { id: true, title: true, slug: true } },
        campaign: { select: { id: true, title: true } },
      },
    });

    if (!donation) {
      return NextResponse.json({ success: false, error: "Donation not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: donation });
  } catch (err) {
    console.error("[GET /api/admin/donations/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch donation." }, { status: 500 });
  }
});

// PATCH /api/admin/donations/[id] — admin can correct status, amounts, references
export const PATCH = apiAuth<{ id: string }>(async (req, ctx) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN]);
  if (deny) return deny;

  try {
    const { id } = await ctx!.params;
    const existing = await prisma.donation.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Donation not found." }, { status: 404 });
    }

    const { amount, currency, paystackReference, paystackStatus, paidAt, projectId, campaignId } =
      await req.json();

    // If this update marks the donation as successful for the first time,
    // increment the linked project's running total
    const becomingSuccess =
      paystackStatus === "SUCCESS" && existing.paystackStatus !== "SUCCESS";

    const donation = await prisma.donation.update({
      where: { id },
      data: {
        ...(amount            && { amount: new Prisma.Decimal(amount) }),
        ...(currency          && { currency }),
        ...(paystackReference && { paystackReference }),
        ...(paystackStatus    && { paystackStatus }),
        ...(paidAt            && { paidAt: new Date(paidAt) }),
        ...(projectId         && { projectId }),
        ...(campaignId        && { campaignId }),
      },
    });

    if (becomingSuccess && donation.projectId) {
      await prisma.project.update({
        where: { id: donation.projectId },
        data:  { currentAmount: { increment: donation.amount } },
      });
    }

    return NextResponse.json({ success: true, data: donation });
  } catch (err: any) {
    if (err?.code === "P2002") {
      return NextResponse.json(
        { success: false, error: "paystackReference already used by another donation." },
        { status: 409 }
      );
    }
    console.error("[PATCH /api/admin/donations/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to update donation." }, { status: 500 });
  }
});

// DELETE /api/admin/donations/[id]
// Rolls back the project's currentAmount if the donation was successful
export const DELETE = apiAuth<{ id: string }>(async (req, ctx) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN]);
  if (deny) return deny;

  try {
    const { id } = await ctx!.params;
    const existing = await prisma.donation.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ success: false, error: "Donation not found." }, { status: 404 });
    }

    await prisma.donation.delete({ where: { id } });

    // Roll back the project's running total
    if (existing.paystackStatus === "SUCCESS" && existing.projectId) {
      await prisma.project.update({
        where: { id: existing.projectId },
        data:  { currentAmount: { decrement: existing.amount } },
      });
    }

    return NextResponse.json({ success: true, message: "Donation deleted." });
  } catch (err) {
    console.error("[DELETE /api/admin/donations/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to delete donation." }, { status: 500 });
  }
});