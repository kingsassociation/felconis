import { Metadata } from "next";
import ServiceContent from "./ServiceContent";

const SERVICES_DATA: Record<string, any> = {
  "growth": {
    title: "Growth Engine",
    subtitle: "High-Velocity Acquisition Infrastructure",
    description: "We architect and deploy end-to-end growth ecosystems designed to dominate search auctions and social feeds. Our approach treats marketing as a technical engineering challenge, not just a creative exercise.",
    highlights: [
      { title: "Surgical SEO", desc: "Technical site architecture and semantic authority mapping." },
      { title: "Paid Performance", desc: "Intent-based funnels optimized for sub-second precision." },
      { title: "Social Sync", desc: "Algorithmic brand signaling across all social nodes." }
    ],
    features: [
      "Technical Core Optimization",
      "Strategic Overview Clusters",
      "Algorithmic Authority Building",
      "Performance Max Optimization",
      "Creative Strategy & Production",
      "Funnel-Wide Tracking"
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
  },
  "design": {
    title: "Design Systems",
    subtitle: "Visual Logic That Converts",
    description: "We build scalable design languages that elevate brand authority and remove friction from the user journey. Every pixel is calculated to support your brand signal.",
    highlights: [
      { title: "UI/UX Systems", desc: "Atomic design logic for scalable interfaces." },
      { title: "Brand Identity", desc: "Engineering the DNA of your visual presence." },
      { title: "Graphic Nodes", desc: "High-precision assets for digital distribution." }
    ],
    features: [
      "Atomic Design Systems",
      "User Psychology Mapping",
      "Interactive Prototyping",
      "Accessibility Compliance",
      "Brand Guidelines Node",
      "Ad Creative Production"
    ],
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2070"
  },
  "engineering": {
    title: "Digital Infrastructure",
    subtitle: "High-Performance Engineering",
    description: "We architect sub-second digital experiences that handle scale without breaking. Our engineering board focuses on performance-first frontend and robust enterprise backend systems.",
    highlights: [
      { title: "Web Systems", desc: "Full-stack Next.js and React engineering." },
      { title: "Architecture", desc: "Scaling backend for global operations." },
      { title: "Security", desc: "Encryption-first protocol layer." }
    ],
    features: [
      "Next.js/React Optimization",
      "API & Headless Systems",
      "Database Design & Scaling",
      "Cloud Deployment Ops",
      "Security Protocol Audit",
      "System Integration Sync"
    ],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070"
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES_DATA[slug] || SERVICES_DATA["growth"];

  return {
    title: `${service.title} | Felconis Capability`,
    description: service.subtitle,
    openGraph: {
      title: `${service.title} | Felconis Institutional Execution`,
      description: service.description,
      images: [service.image],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES_DATA[slug] || SERVICES_DATA["growth"];

  return <ServiceContent slug={slug} service={service} servicesData={SERVICES_DATA} />;
}
