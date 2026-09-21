import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { apiAuth } from "@/lib/api/auth";
import { requireRoles } from "@/lib/roleGuards";
import { UserRole } from "@prisma/client";

// GET /api/staff/donors/[id] — single donor with full donation history
export const GET = apiAuth<{ id: string }>(async (req, ctx) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN, UserRole.STAFF]);
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
    console.error("[GET /api/staff/donors/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch donor." }, { status: 500 });
  }
});