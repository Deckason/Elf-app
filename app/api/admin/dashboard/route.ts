import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { apiAuth } from "@/lib/api/auth";
import { requireRoles } from "@/lib/roleGuards";
import { UserRole } from "@prisma/client";

// GET /api/admin/dashboard — full org-wide stats, admin only
export const GET = apiAuth(async (req: NextRequest & { user: any }) => {
  const deny = requireRoles(req.user, [UserRole.ADMIN]);
  if (deny) return deny;

  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [
      totalDonationsResult,
      successfulDonations,
      pendingDonations,
      recentDonationsResult,
      donationsByDay,
      totalProjects,
      activeProjects,
      completedProjects,
      featuredProjects,
      topProjects,
      totalBlogs,
      publishedBlogs,
      draftBlogs,
      totalCampaigns,
      activeCampaigns,
      campaignFunds,
      totalInvestments,
      investmentTotal,
      totalUsers,
      usersByRole,
      recentDonations,
      recentBlogs,
    ] = await Promise.all([
      prisma.donation.aggregate({ where: { paystackStatus: "SUCCESS" }, _sum: { amount: true }, _count: true }),
      prisma.donation.count({ where: { paystackStatus: "SUCCESS" } }),
      prisma.donation.count({ where: { paystackStatus: "PENDING" } }),
      prisma.donation.aggregate({ where: { paystackStatus: "SUCCESS", paidAt: { gte: thirtyDaysAgo } }, _sum: { amount: true }, _count: true }),

      prisma.$queryRaw<{ day: Date; total: number; count: number }[]>`
        SELECT
          DATE_TRUNC('day', "paidAt") AS day,
          SUM(amount)::float           AS total,
          COUNT(*)::int                AS count
        FROM "Donation"
        WHERE "paystackStatus" = 'SUCCESS'
          AND "paidAt" >= ${thirtyDaysAgo}
        GROUP BY DATE_TRUNC('day', "paidAt")
        ORDER BY day ASC
      `,

      prisma.project.count(),
      prisma.project.count({ where: { status: "ACTIVE" } }),
      prisma.project.count({ where: { status: "COMPLETED" } }),
      prisma.project.count({ where: { isFeatured: true } }),
      prisma.project.findMany({
        orderBy: { currentAmount: "desc" },
        take: 5,
        select: {
          id: true, title: true, slug: true,
          goalAmount: true, currentAmount: true, status: true,
          _count: { select: { donations: true } },
        },
      }),

      prisma.blog.count(),
      prisma.blog.count({ where: { isPublished: true } }),
      prisma.blog.count({ where: { isPublished: false } }),

      prisma.campaign.count(),
      prisma.campaign.count({ where: { isActive: true } }),
      prisma.donation.aggregate({ where: { paystackStatus: "SUCCESS", campaignId: { not: null } }, _sum: { amount: true } }),

      prisma.investment.count(),
      prisma.investment.aggregate({ _sum: { amount: true } }),

      prisma.user.count(),
      prisma.user.groupBy({ by: ["role"], _count: { _all: true } }),

      prisma.donation.findMany({
        where:   { paystackStatus: "SUCCESS" },
        orderBy: { paidAt: "desc" },
        take:    8,
        select: {
          id: true, amount: true, paidAt: true,
          donor:   { select: { fullName: true, isAnonymous: true } },
          project: { select: { title: true, slug: true } },
        },
      }),

      prisma.blog.findMany({
        where:   { isPublished: true },
        orderBy: { publishedAt: "desc" },
        take:    5,
        select: {
          id: true, title: true, slug: true, publishedAt: true,
          author: { select: { firstName: true, lastName: true } },
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        donations: {
          total:            totalDonationsResult._count,
          totalRaisedNaira: Number(totalDonationsResult._sum.amount ?? 0),
          successful:       successfulDonations,
          pending:          pendingDonations,
          last30Days: {
            count:       recentDonationsResult._count,
            raisedNaira: Number(recentDonationsResult._sum.amount ?? 0),
          },
          dailyBreakdown: donationsByDay.map(row => ({
            day:   row.day,
            total: Number(row.total),
            count: Number(row.count),
          })),
        },
        projects: {
          total: totalProjects, active: activeProjects, completed: completedProjects, featured: featuredProjects,
          top5: topProjects.map(p => ({
            ...p,
            goalAmount:    Number(p.goalAmount),
            currentAmount: Number(p.currentAmount),
            progressPct: Number(p.goalAmount) > 0
              ? Math.min(100, Number(((Number(p.currentAmount) / Number(p.goalAmount)) * 100).toFixed(1)))
              : 0,
          })),
        },
        blogs:    { total: totalBlogs,     published: publishedBlogs,   drafts: draftBlogs },
        campaigns:{ total: totalCampaigns, active:    activeCampaigns,  totalRaisedNaira: Number(campaignFunds._sum.amount ?? 0) },
        investments: {
          total:      totalInvestments,
          totalNaira: Number(investmentTotal._sum.amount ?? 0),
        },
        users: {
          total:  totalUsers,
          byRole: usersByRole.reduce((acc: Record<string, number>, row) => {
            acc[row.role] = row._count._all;
            return acc;
          }, {}),
        },
        recentActivity: {
          donations: recentDonations.map(d => ({
            id:           d.id,
            amount:       Number(d.amount),
            paidAt:       d.paidAt,
            donorName:    d.donor?.isAnonymous ? "Anonymous" : (d.donor?.fullName ?? "Unknown"),
            projectTitle: d.project?.title ?? null,
            projectSlug:  d.project?.slug  ?? null,
          })),
          blogs: recentBlogs,
        },
      },
    });
  } catch (err) {
    console.error("[GET /api/admin/dashboard]", err);
    return NextResponse.json({ success: false, error: "Failed to load dashboard stats." }, { status: 500 });
  }
});