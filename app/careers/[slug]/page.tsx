import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import JobContent from "./JobContent";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = await prisma.job.findUnique({
    where: { slug }
  });

  if (!job) return { title: "Job Not Found" };

  return {
    title: `${job.title} | Felconis Careers`,
    description: job.overview || "",
    openGraph: {
      title: `${job.title} | Join the Felconis Growth Board`,
      description: job.overview || "",
      type: "article",
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const job = await prisma.job.findUnique({
    where: { slug }
  });

  if (!job) {
    notFound();
  }

  return <JobContent slug={slug} job={job} />;
}
