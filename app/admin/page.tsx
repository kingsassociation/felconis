import prisma from "@/lib/prisma";
import AdminOverviewContent from "./AdminOverviewContent";

export default async function AdminDashboard() {
  const [
    serviceCount,
    workCount,
    jobCount,
    leadCount,
    appCount,
    partnerCount,
    recentLeads
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
    })
  ]);

  const activeNodes = serviceCount + workCount + jobCount;
  const totalLeads = leadCount + appCount;

  const stats = [
    { label: "Active Nodes", val: activeNodes.toString(), delta: "+2", icon: "Zap" },
    { label: "Total Leads", val: totalLeads.toString(), delta: "+12", icon: "Users" },
    { label: "Partner Network", val: partnerCount.toString(), delta: "+5", icon: "Activity" },
    { label: "Strategic Impact", val: workCount.toString(), delta: "0.4", icon: "TrendingUp" },
  ];

  return (
    <AdminOverviewContent 
      stats={stats} 
      recentLeads={recentLeads}
    />
  );
}
