import prisma from "@/lib/prisma";
import { Metadata } from "next";
import WorkContent from "./WorkContent";

export const metadata: Metadata = {
  title: "Work Archive | Felconis Strategic Impact",
  description: "A comprehensive record of architectural achievements and successful strategic implementations.",
};

export default async function WorkPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <WorkContent initialStudies={caseStudies} />;
}
