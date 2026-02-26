import { Metadata } from "next";
import WorkContent from "./WorkContent";

const CASE_STUDIES_DATA: Record<string, any> = {
  "raafidan": {
    title: "Revenue Scaling for Raafidan",
    client: "Raafidan Enterprise",
    tag: "E-commerce",
    stats: "+220%",
    kpi: "Revenue Acceleration",
    duration: "4 Months",
    problem: "The client was experiencing stagnating revenue growth despite high traffic. Their legacy infrastructure was causing sub-optimal conversion rates and high bounce rates on product pages.",
    strategy: "We deployed a sub-second Next.js commerce architecture integrated with an automated SEO semantic engine. This was coupled with a systematic approach to target high-intent segments.",
    execution: [
      "Modular Frontend Engineering",
      "Headless CMS Integration",
      "Automated SEO Pipelines",
      "Algorithmic Ad Optimization"
    ],
    results: [
      "220% Revenue Increase",
      "45% Decrease in Bounce Rate",
      "3.2x Return on Ad Spend (ROAS)",
      "Top 1% Page Speed Performance"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
  },
  "nextzen": {
    title: "SaaS Architecture for NextZen",
    client: "NextZen Systems",
    tag: "SaaS",
    stats: "3.2x",
    kpi: "Retention Efficiency",
    duration: "6 Months",
    problem: "NextZen was struggling with technical debt in their core multi-tenant platform, leading to scalability issues and high churn rates among enterprise clients.",
    strategy: "Our engineering board re-architected the core system nodes using a server-side rendering logic and real-time data sync. We also implemented a custom CRM integration to track user intent signals.",
    execution: [
      "Multi-Tenant Node Architecture",
      "Real-time Data Sync Protocol",
      "Enterprise UI/UX Audit",
      "Strategic Retargeting Loops"
    ],
    results: [
      "3.2x User Retention Lift",
      "99.99% System Uptime",
      "85% Faster Deployment Cycles",
      "12 New Enterprise Contracts"
    ],
    image: "https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=2070"
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES_DATA[slug] || CASE_STUDIES_DATA["raafidan"];

  return {
    title: `${study.title} | Felconis Case Study`,
    description: study.strategy,
    openGraph: {
      title: `${study.title} | Felconis Strategic Impact`,
      description: study.problem,
      images: [study.image],
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = CASE_STUDIES_DATA[slug] || CASE_STUDIES_DATA["raafidan"];

  return <WorkContent slug={slug} study={study} />;
}
