import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import AdminOverviewContent from "./AdminOverviewContent";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/portal/login");

  const [
    serviceCount,
    workCount,
    jobCount,
    leadCount,
    appCount,
    partnerCount,
    recentLeads,
    admin
  ] = await Promise.all([
    prisma.service.count(),
    prisma.caseStudy.count(),
    prisma.job.count(),
    prisma.lead.count(),
    prisma.application.count(),
    prisma.partner.count(),
    prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    }),
    prisma.user.findUnique({
      where: { id: session.id },
      select: { name: true }
    })
  ]);

  const activeNodes = serviceCount + workCount + jobCount;
  const totalLeads = leadCount + appCount;

  const stats = [
    { label: "Active Nodes", val: activeNodes.toString(), delta: "+2", icon: "Zap" },
    { label: "Total Leads", val: totalLeads.toString(), delta: "+12", icon: "Users" },
    { label: "Partners", val: partnerCount.toString(), delta: "+5", icon: "Activity" },
    { label: "Case Studies", val: workCount.toString(), delta: "0.4", icon: "TrendingUp" },
  ];

  return (
    <AdminOverviewContent 
      stats={stats} 
      recentLeads={recentLeads}
      adminName={admin.name || "Administrator"}
    />
  );
}
