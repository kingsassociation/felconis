import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceContent from "./ServiceContent";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = await prisma.service.findUnique({
    where: { slug }
  });

  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Felconis Capability`,
    description: service.subtitle || service.description,
    openGraph: {
      title: `${service.title} | Felconis Institutional Execution`,
      description: service.description,
      images: service.image ? [service.image] : [],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const [service, allServices] = await Promise.all([
    prisma.service.findUnique({
      where: { slug }
    }),
    prisma.service.findMany()
  ]);

  if (!service) {
    notFound();
  }

  // Convert DB structure to match existing component expectation
  const formattedService = {
    ...service,
    highlights: (service.highlights as any[]) || []
  };

  const servicesData = allServices.reduce((acc: any, s: any) => {
    acc[s.slug] = {
      ...s,
      highlights: (s.highlights as any[]) || []
    };
    return acc;
  }, {} as Record<string, any>);

  return <ServiceContent slug={slug} service={formattedService} servicesData={servicesData} />;
}
