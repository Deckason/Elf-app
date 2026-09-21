import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { apiAuth } from "@/lib/api/auth";
import { requireRoles } from "@/lib/roleGuards";
import { slugify, uniqueSlug } from "@/lib/slugify";
import { UserRole } from "@prisma/client";

/* ─────────────────────────────────────────────────────────────
   GET /api/blogs
   Public — returns published posts.
   Authenticated ADMIN/STAFF see all posts (including drafts).
   Query params: page, limit, search, published
───────────────────────────────────────────────────────────── */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page   = Math.max(1, Number(searchParams.get("page")  ?? 1));
    const limit  = Math.min(100, Math.max(1, Number(searchParams.get("limit") ?? 10)));
    const search = searchParams.get("search") ?? undefined;
    const skip   = (page - 1) * limit;

    // Optional auth — staff/admin can see unpublished drafts
    let isPrivileged = false;
    const auth = req.headers.get("authorization");
    if (auth) {
      try {
        const jwt   = await import("jsonwebtoken");
        const token = auth.startsWith("Bearer ") ? auth.split(" ")[1] : auth;
        const p     = jwt.default.verify(token, process.env.JWT_SECRET!) as any;
        isPrivileged = p.role === UserRole.ADMIN || p.role === UserRole.STAFF;
      } catch { /* ignore */ }
    }

    const where = {
      ...(!isPrivileged && { isPublished: true }),
      ...(search && {
        OR: [
          { title:   { contains: search, mode: "insensitive" as const } },
          { excerpt: { contains: search, mode: "insensitive" as const } },
        ],
      }),
    };

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { publishedAt: "desc" },
        select: {
          id:          true,
          title:       true,
          slug:        true,
          excerpt:     true,
          coverImage:  true,
          isPublished: true,
          publishedAt: true,
          createdAt:   true,
          author:      { select: { firstName: true, lastName: true, email: true } },
        },
      }),
      prisma.blog.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: blogs,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error("[GET /api/blogs]", err);
    return NextResponse.json({ success: false, error: "Failed to fetch blogs." }, { status: 500 });
  }
}

/* ─────────────────────────────────────────────────────────────
   POST /api/blogs
   Access: ADMIN, STAFF
───────────────────────────────────────────────────────────── */
export const POST = apiAuth(async (req: NextRequest & { user: any }) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN, UserRole.STAFF]);
  if (deny) return deny;

  try {
    const body = await req.json();
    const {
      title,
      content,
      excerpt,
      coverImage,
      isPublished = false,
    } = body;

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "title and content are required." },
        { status: 400 }
      );
    }

    // Unique slug
    let slug = slugify(title);
    const conflict = await prisma.blog.findUnique({ where: { slug } });
    if (conflict) slug = uniqueSlug(title);

    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        excerpt:     excerpt    ?? null,
        coverImage:  coverImage ?? null,
        isPublished,
        publishedAt: isPublished ? new Date() : null,
        authorId:    req.user.sub,
      },
      include: { author: { select: { firstName: true, lastName: true } } },
    });

    return NextResponse.json({ success: true, data: blog }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/blogs]", err);
    return NextResponse.json({ success: false, error: "Failed to create blog post." }, { status: 500 });
  }
});