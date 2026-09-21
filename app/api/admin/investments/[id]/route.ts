import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { apiAuth } from "@/lib/api/auth";
import { requireRoles } from "@/lib/roleGuards";
import { Prisma, UserRole } from "@prisma/client";

// GET /api/admin/investments/[id]
export const GET = apiAuth<{ id: string }>(async (req, ctx) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN]);
  if (deny) return deny;

  try {
    const { id } = await ctx!.params;

    const investment = await prisma.investment.findUnique({
      where:   { id },
      include: {
        project: { select: { id: true, title: true, slug: true, status: true } },
        user:    { select: { id: true, firstName: true, lastName: true, email: true } },
      },
    });

    if (!investment) {
      return NextResponse.json({ success: false, error: "Investment not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: investment });
  } catch (err) {
    console.error("[GET /api/admin/investments/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch investment." }, { status: 500 });
  }
});

// PATCH /api/admin/investments/[id] — admin can correct amount or reassign project
export const PATCH = apiAuth<{ id: string }>(async (req, ctx) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN]);
  if (deny) return deny;

  try {
    const { id } = await ctx!.params;

    const investment = await prisma.investment.findUnique({ where: { id } });
    if (!investment) {
      return NextResponse.json({ success: false, error: "Investment not found." }, { status: 404 });
    }

    const { amount, projectId } = await req.json();

    const updated = await prisma.investment.update({
      where: { id },
      data: {
        ...(amount    && { amount: new Prisma.Decimal(amount) }),
        ...(projectId && { projectId }),
      },
      include: {
        project: { select: { id: true, title: true } },
        user:    { select: { id: true, firstName: true, lastName: true } },
      },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("[PATCH /api/admin/investments/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to update investment." }, { status: 500 });
  }
});

// DELETE /api/admin/investments/[id] — admin can delete any investment
export const DELETE = apiAuth<{ id: string }>(async (req, ctx) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN]);
  if (deny) return deny;

  try {
    const { id } = await ctx!.params;

    const investment = await prisma.investment.findUnique({ where: { id } });
    if (!investment) {
      return NextResponse.json({ success: false, error: "Investment not found." }, { status: 404 });
    }

    await prisma.investment.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Investment deleted." });
  } catch (err) {
    console.error("[DELETE /api/admin/investments/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to delete investment." }, { status: 500 });
  }
});