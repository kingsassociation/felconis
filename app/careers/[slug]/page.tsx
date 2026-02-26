import { Metadata } from "next";
import JobContent from "./JobContent";

const JOBS_DATA: Record<string, any> = {
  "snr-backend": {
    title: "Senior Backend Engineer",
    department: "Engineering",
    location: "Remote / Dhaka",
    type: "Full-Time",
    salary: "$60k - $90k",
    overview: "We are seeking a high-precision backend architect to own the core infrastructure nodes of our global scaling systems. You will be responsible for sub-second API performance and multi-tenant database sovereignty.",
    requirements: [
      "8+ years of core backend engineering experience.",
      "Expertise in Node.js, Go, or Rust.",
      "Deep understanding of PostgreSQL and Redis at scale.",
      "Proven experience with AWS/GCP infrastructure board.",
      "Ability to architect sub-second data pipelines."
    ],
    benefits: [
      "Competitive Equity Participation",
      "Global Remote Node Setup",
      "Advanced Learning Budget",
      "Performance-Based ROI Bonuses"
    ]
  },
  "growth-lead": {
    title: "Growth Strategy Lead",
    department: "Marketing",
    location: "Hybrid / Dubai",
    type: "Full-Time",
    salary: "$50k - $80k",
    overview: "Help us architect the next generation of acquisition engines. You will lead the strategy for enterprise-grade performance marketing loops and algorithmic brand signaling.",
    requirements: [
       "5+ years in high-velocity growth marketing.",
       "Technical understanding of ad-tech and tracking protocols.",
       "Ability to build intent-based conversion funnels.",
       "Data-first mindset with radical transparency focus.",
       "Experience managing $100k+ monthly ad deployments."
    ],
    benefits: [
      "Performance Multiplier Bonuses",
      "Global Hub Access",
      "Strategic Freedom Nodes",
      "Health & Wellness Sync"
    ]
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const job = JOBS_DATA[slug] || JOBS_DATA["snr-backend"];

  return {
    title: `${job.title} | Felconis Careers`,
    description: job.overview,
    openGraph: {
      title: `${job.title} | Join the Felconis Growth Board`,
      description: job.overview,
      type: "article",
    },
  };
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params;
  const job = JOBS_DATA[slug] || JOBS_DATA["snr-backend"];

  return <JobContent slug={slug} job={job} />;
}
