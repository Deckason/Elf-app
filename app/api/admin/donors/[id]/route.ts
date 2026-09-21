import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { apiAuth } from "@/lib/api/auth";
import { requireRoles } from "@/lib/roleGuards";
import { UserRole } from "@prisma/client";

// GET /api/admin/donors/[id]
export const GET = apiAuth<{ id: string }>(async (req, ctx) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN]);
  if (deny) return deny;

  try {
    const { id } = await ctx!.params;

    const donor = await prisma.donor.findUnique({
      where: { id },
      include: {
        _count: { select: { donations: true } },
        donations: {
          orderBy: { createdAt: "desc" },
          include: {
            project:  { select: { id: true, title: true } },
            campaign: { select: { id: true, title: true } },
          },
        },
      },
    });

    if (!donor) {
      return NextResponse.json({ success: false, error: "Donor not found." }, { status: 404 });
    }

    const { donations, ...rest } = donor;
    const totalDonatedNaira = donations
      .filter(d => d.paystackStatus === "SUCCESS")
      .reduce((sum, d) => sum + Number(d.amount), 0);

    return NextResponse.json({ success: true, data: { ...rest, donations, totalDonatedNaira } });
  } catch (err) {
    console.error("[GET /api/admin/donors/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch donor." }, { status: 500 });
  }
});

// PATCH /api/admin/donors/[id]
export const PATCH = apiAuth<{ id: string }>(async (req, ctx) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN]);
  if (deny) return deny;

  try {
    const { id } = await ctx!.params;
    const donor = await prisma.donor.findUnique({ where: { id } });
    if (!donor) {
      return NextResponse.json({ success: false, error: "Donor not found." }, { status: 404 });
    }

    const { email, fullName, phone, isAnonymous } = await req.json();

    const updated = await prisma.donor.update({
      where: { id },
      data: {
        ...(email       !== undefined && { email }),
        ...(fullName    !== undefined && { fullName }),
        ...(phone       !== undefined && { phone }),
        ...(isAnonymous !== undefined && { isAnonymous }),
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err: any) {
    if (err?.code === "P2002") {
      return NextResponse.json({ success: false, error: "A donor with this email already exists." }, { status: 409 });
    }
    console.error("[PATCH /api/admin/donors/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to update donor." }, { status: 500 });
  }
});

// DELETE /api/admin/donors/[id]
// Only allowed if no linked donations exist, to protect the financial audit trail
export const DELETE = apiAuth<{ id: string }>(async (req, ctx) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN]);
  if (deny) return deny;

  try {
    const { id } = await ctx!.params;
    const { searchParams } = new URL(req.url);
    const force = searchParams.get("force") === "true";

    const donor = await prisma.donor.findUnique({
      where:   { id },
      include: { _count: { select: { donations: true } } },
    });

    if (!donor) {
      return NextResponse.json({ success: false, error: "Donor not found." }, { status: 404 });
    }

    if (donor._count.donations > 0 && !force) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot delete: this donor has ${donor._count.donations} donation(s). Pass ?force=true to delete anyway.`,
        },
        { status: 422 }
      );
    }

    if (force && donor._count.donations > 0) {
      await prisma.$transaction([
        prisma.donation.deleteMany({ where: { donorId: id } }),
        prisma.donor.delete({       where: { id } }),
      ]);
    } else {
      await prisma.donor.delete({ where: { id } });
    }

    return NextResponse.json({ success: true, message: "Donor deleted." });
  } catch (err) {
    console.error("[DELETE /api/admin/donors/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to delete donor." }, { status: 500 });
  }
});