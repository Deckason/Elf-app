import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { apiAuth } from "@/lib/api/auth";
import { requireRoles, canModify } from "@/lib/roleGuards";
import { slugify, uniqueSlug } from "@/lib/slugify";
import { UserRole } from "@prisma/client";

/* ─────────────────────────────────────────────────────────────
   GET /api/blogs/[id]
   Public — accepts id OR slug.
   Unpublished posts return 404 to unauthenticated callers.
───────────────────────────────────────────────────────────── */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const blog = await prisma.blog.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: { author: { select: { firstName: true, lastName: true } } },
    });

    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog post not found." }, { status: 404 });
    }

    // If draft, only allow authenticated staff/admin to view it
    if (!blog.isPublished) {
      let isPrivileged = false;
      const auth = req.headers.get("authorization");
      if (auth) {
        try {
          const jwt   = await import("jsonwebtoken");
          const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : auth;
          const p     = jwt.default.verify(token, process.env.JWT_SECRET!) as any;
          isPrivileged =
            p?.role === UserRole.ADMIN ||
            (p?.role === UserRole.STAFF && p?.sub === blog.authorId);
        } catch { /* ignore */ }
      }
      if (!isPrivileged) {
        return NextResponse.json({ success: false, error: "Blog post not found." }, { status: 404 });
      }
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (err) {
    console.error("[GET /api/blogs/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch blog post." }, { status: 500 });
  }
}

/* ─────────────────────────────────────────────────────────────
   PATCH /api/blogs/[id]
   Admin: edit any post.
   Staff: edit only their own post.
   Access: ADMIN, STAFF
───────────────────────────────────────────────────────────── */
export const PATCH = apiAuth<{ id: string }>(async (req, ctx) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN, UserRole.STAFF]);
  if (deny) return deny;

  try {
    const { id } = await ctx.params;
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog post not found." }, { status: 404 });
    }

    if (!canModify(req.user, blog.authorId)) {
      return NextResponse.json(
        { success: false, error: "Forbidden: you can only edit your own posts." },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, content, excerpt, coverImage, isPublished } = body;

    // Re-slug if title changed
    let slug = blog.slug;
    if (title && title !== blog.title) {
      const candidate = slugify(title);
      const conflict  = await prisma.blog.findFirst({
        where: { slug: candidate, NOT: { id: blog.id } },
      });
      slug = conflict ? uniqueSlug(title) : candidate;
    }

    // Track when the post is first published
    let publishedAt = blog.publishedAt;
    if (isPublished === true && !blog.isPublished) {
      publishedAt = new Date();
    } else if (isPublished === false) {
      publishedAt = null;
    }

    const updated = await prisma.blog.update({
      where: { id },
      data: {
        ...(title      && { title, slug }),
        ...(content    && { content }),
        ...(excerpt    !== undefined && { excerpt }),
        ...(coverImage !== undefined && { coverImage }),
        ...(isPublished !== undefined && { isPublished, publishedAt }),
      },
      include: { author: { select: { firstName: true, lastName: true } } },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error("[PATCH /api/blogs/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to update blog post." }, { status: 500 });
  }
});

/* ─────────────────────────────────────────────────────────────
   DELETE /api/blogs/[id]
   Admin: delete any post.
   Staff: delete only their own post.
   Access: ADMIN, STAFF
───────────────────────────────────────────────────────────── */
export const DELETE = apiAuth<{ id: string }>(async (req, ctx) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN, UserRole.STAFF]);
  if (deny) return deny;

  try {
    const { id } = await ctx.params;
    const blog = await prisma.blog.findUnique({ where: { id } });
    if (!blog) {
      return NextResponse.json({ success: false, error: "Blog post not found." }, { status: 404 });
    }

    if (!canModify(req.user, blog.authorId)) {
      return NextResponse.json(
        { success: false, error: "Forbidden: you can only delete your own posts." },
        { status: 403 }
      );
    }

    await prisma.blog.delete({ where: { id } });

    return NextResponse.json({ success: true, message: "Blog post deleted." });
  } catch (err) {
    console.error("[DELETE /api/blogs/:id]", err);
    return NextResponse.json({ success: false, error: "Failed to delete blog post." }, { status: 500 });
  }
});