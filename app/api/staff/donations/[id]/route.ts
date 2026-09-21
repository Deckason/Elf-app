import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { apiAuth } from "@/lib/api/auth";
import { requireRoles } from "@/lib/roleGuards";
import { UserRole } from "@prisma/client";

// GET /api/staff/donations/[id] — staff can view a single donation
export const GET = apiAuth<{ id: string }>(async (req, ctx) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN, UserRole.STAFF]);
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
    console.error("[GET /api/staff/donations/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch donation." }, { status: 500 });
  }
});