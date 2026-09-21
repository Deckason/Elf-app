import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { apiAuth } from "@/lib/api/auth";
import { requireRoles } from "@/lib/roleGuards";
import { UserRole } from "@prisma/client";

// GET /api/staff/dashboard — stats scoped to this staff member's own content
export const GET = apiAuth(async (req: NextRequest & { user: any }) => {
  const deny = requireRoles(req.user, [UserRole.STAFF]);
  if (deny) return deny;

  const userId = req.user.sub;

  try {
    const projectWhere = { createdById: userId };
    const blogWhere    = { authorId:    userId };

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      totalProjects,
      activeProjects,
      completedProjects,
      featuredProjects,
      topProjects,
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      recentBlogs,
      recentProjects,
    ] = await Promise.all([
      prisma.project.count({ where: projectWhere }),
      prisma.project.count({ where: { ...projectWhere, status: "ACTIVE" } }),
      prisma.project.count({ where: { ...projectWhere, status: "COMPLETED" } }),
      prisma.project.count({ where: { ...projectWhere, isFeatured: true } }),

      prisma.project.findMany({
        where:   projectWhere,
        orderBy: { currentAmount: "desc" },
        take:    5,
        select: {
          id:            true,
          title:         true,
          slug:          true,
          goalAmount:    true,
          currentAmount: true,
          status:        true,
          _count:        { select: { donations: true } },
        },
      }),

      prisma.blog.count({ where: blogWhere }),
      prisma.blog.count({ where: { ...blogWhere, isPublished: true } }),
      prisma.blog.count({ where: { ...blogWhere, isPublished: false } }),

      prisma.blog.findMany({
        where:   { ...blogWhere, isPublished: true },
        orderBy: { publishedAt: "desc" },
        take:    5,
        select: {
          id:          true,
          title:       true,
          slug:        true,
          publishedAt: true,
        },
      }),

      prisma.project.findMany({
        where:   { ...projectWhere, createdAt: { gte: thirtyDaysAgo } },
        orderBy: { createdAt: "desc" },
        take:    5,
        select: {
          id:            true,
          title:         true,
          slug:          true,
          status:        true,
          currentAmount: true,
          goalAmount:    true,
          createdAt:     true,
        },
      }),
    ]);

    // Aggregate total raised across all staff's projects
    const raisedResult = await prisma.project.aggregate({
      where:  projectWhere,
      _sum:   { currentAmount: true },
    });

    return NextResponse.json({
      success: true,
      data: {
        projects: {
          total:     totalProjects,
          active:    activeProjects,
          completed: completedProjects,
          featured:  featuredProjects,
          totalRaisedNaira: Number(raisedResult._sum.currentAmount ?? 0),
          top5: topProjects.map(p => ({
            ...p,
            goalAmount:    Number(p.goalAmount),
            currentAmount: Number(p.currentAmount),
            progressPct: Number(p.goalAmount) > 0
              ? Math.min(100, Number(((Number(p.currentAmount) / Number(p.goalAmount)) * 100).toFixed(1)))
              : 0,
          })),
          recent: recentProjects,
        },
        blogs: {
          total:     totalBlogs,
          published: publishedBlogs,
          drafts:    draftBlogs,
          recent:    recentBlogs,
        },
      },
    });
  } catch (err) {
    console.error("[GET /api/staff/dashboard]", err);
    return NextResponse.json({ success: false, error: "Failed to load dashboard stats." }, { status: 500 });
  }
});