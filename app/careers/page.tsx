import prisma from "@/lib/prisma";
import { Metadata } from "next";
import CareersContent from "./CareersContent";

export const metadata: Metadata = {
  title: "Careers | Join the Felconis Board",
  description: "Join our architectural board. We are looking for exceptional talent to lead high-precision engineering and strategic growth.",
};

export default async function CareersPage() {
  const jobs = await prisma.job.findMany({
    where: { active: true },
    orderBy: { createdAt: 'desc' }
  });

  return <CareersContent initialJobs={jobs} />;
}
