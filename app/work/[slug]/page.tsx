import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkContent from "./WorkContent";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await prisma.caseStudy.findUnique({
    where: { slug }
  });

  if (!study) return { title: "Case Study Not Found" };

  return {
    title: `${study.title} | Felconis Case Study`,
    description: study.strategy,
    openGraph: {
      title: `${study.title} | Felconis Strategic Impact`,
      description: study.problem,
      images: study.image ? [study.image] : [],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const study = await prisma.caseStudy.findUnique({
    where: { slug }
  });

  if (!study) {
    notFound();
  }

  return <WorkContent slug={slug} study={study} />;
}
