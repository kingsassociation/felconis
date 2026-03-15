import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";
import * as dotenv from 'dotenv';
import path from 'path';
import { Pool } from "pg";

// Load environment variables from .env
dotenv.config({ path: path.join(process.cwd(), '.env') });

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const SERVICES_DATA = [
    {
        title: "Cloud & Architecture",
        slug: "engineering",
        subtitle: "High-Performance Engineering",
        description: "We architect sub-second digital experiences that handle scale without breaking. Our engineering focuses on performance-first backend systems and resilient cloud architecture tailored for international standards.",
        icon: "Code2",
        highlights: [
            {
                title: "Cloud Architecture",
                desc: "Designing scalable, secure, and resilient infrastructure. We implement multi-region deployments and automated scaling protocols for absolute availability. Our solutions leverage serverless and edge compute to minimize latency and maximize efficiency."
            },
            {
                title: "Enterprise Backend",
                desc: "Robust server-side logic engineered for high-throughput environments. We focus on data integrity, sub-second latency, and industrial-grade security. Our microservices orchestration ensures high availability and seamless system integration."
            },
            {
                title: "API Ecosystems",
                desc: "Building high-performance API layers that serve as the connective tissue for modern digital platforms. Optimized for developer experience and technical velocity, supporting both REST and GraphQL protocols."
            },
            {
                title: "Database Engineering",
                desc: "Complex data modeling and optimization for high-concurrency environments. We design relational and non-relational architectures that ensure data sovereignty, ACID compliance, and sub-millisecond query performance."
            }
        ],
        features: [
            "Distributed Systems Logic",
            "Serverless & Edge Compute",
            "Infrastructure as Code",
            "Microservices Orchestration",
            "Advanced Encryption Layers",
            "System Optimization Protocol",
            "Real-time Data Streams",
            "Legacy Core Migration"
        ],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070",
        category: "ENGINEERING"
    },
    {
        title: "Product Engineering",
        slug: "product",
        subtitle: "Visual Logic & SaaS Excellence",
        description: "We build scalable SaaS platforms and digital products that elevate brand authority and remove friction from the user journey. Every pixel is calculated to support your technical signal and organizational goals.",
        icon: "Layers",
        highlights: [
            {
                title: "SaaS Engineering",
                desc: "Building multi-tenant platforms architected for scalability and maintainability. We deliver robust software-as-a-service solutions that scale linearly with user growth, incorporating advanced features like multi-currency billing and cross-region data sync."
            },
            {
                title: "Web Applications",
                desc: "Next-generation frontend engineering using modern frameworks like Next.js and React. We focus on hydration optimization and global CDN deployment to ensure a sub-second time-to-interactive for global users."
            },
            {
                title: "Technical UX/UI",
                desc: "Visual logic architected for conversion and clarity. We build scalable design systems based on atomic design principles, ensuring consistency and industrial authority across all digital touchpoints."
            },
            {
                title: "Custom Systems",
                desc: "Bespoke digital solutions tailored for specific institutional workflows. We engineer tailor-made tools that integrate seamlessly with existing enterprise resource planning (ERP) systems and proprietary governance models."
            }
        ],
        features: [
            "Multi-Tenant SaaS Logic",
            "Atomic Design Systems",
            "Interactive Prototyping",
            "State Management Optimization",
            "Next.js/React Expertise",
            "Product Strategy Sync",
            "Global Compliance Standards",
            "Metric-Driven Aesthetics"
        ],
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2070",
        category: "PRODUCT"
    },
    {
        title: "Assurance & Performance",
        slug: "assurance",
        subtitle: "Stability & Velocity Protocol",
        description: "Ensuring the absolute stability, security, and performance of your digital ecosystem through rigorous automated quality control, performance auditing, and industrial-grade security protocols.",
        icon: "ShieldCheck",
        highlights: [
            {
                title: "QA Automation",
                desc: "Industrial-grade testing infrastructure integrated into your CI/CD pipeline. We implement end-to-end automation, visual regression testing, and unit/integration audits to ensure every release meets technical authority standards."
            },
            {
                title: "Security Audits",
                desc: "In-depth vulnerability assessments and compliance reviews. We protect your institutional assets through encryption-first security protocols and zero-trust architected environments, supporting SOC2 and GDPR compliance."
            },
            {
                title: "Performance Ops",
                desc: "Continuous monitoring and optimization for sub-second platform velocity. We identify and eliminate bottlenecks across your entire technical stack, ensuring dominance in core web vitals and user experience metrics."
            },
            {
                title: "Resilience Engineering",
                desc: "Chaos engineering and disaster recovery protocols. We design systems that can withstand catastrophic failures, implementing automated failover and geo-redundant storage solutions for absolute data persistence."
            }
        ],
        features: [
            "QA Automation Frameworks",
            "Visual Regression Testing",
            "SOC2/Compliance Logic",
            "Global Load Balancing",
            "Memory Usage Audits",
            "CI/CD Testing Integration",
            "Threat Modeling protocol",
            "Sub-2ms Latency Goals"
        ],
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070",
        category: "ASSURANCE"
    }
];

const TEAM_MEMBERS_DATA = [
    {
        name: "Alex Sterling",
        role: "Chief Executive Officer",
        image: "images/team/ceo.png",
        bio: "Strategic visionary with 15+ years of experience in scaling enterprise software solutions and institutional digital transformation.",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        order: 1
    },
    {
        name: "Elena Vance",
        role: "Chief Technology Officer",
        image: "images/team/cto.png",
        bio: "Expert in distributed systems and high-throughput architecture. Elena leads our engineering board with a focus on technical sovereignty.",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        order: 2
    },
    {
        name: "Marcus Thorne",
        role: "Head of Product",
        image: "images/team/product.png",
        bio: "A product strategist focused on visual logic and user-centric engineering. Marcus ensures every platform reflects institutional excellence.",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        order: 3
    },
    {
        name: "Sarah Jenkins",
        role: "Director of Engineering",
        image: "images/team/engineering.png",
        bio: "Specializing in industrial-grade security and automated quality assurance protocols for mission-critical deployments.",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        order: 4
    },
    {
        name: "David Chen",
        role: "Lead Solutions Architect",
        image: "images/team/architect.png",
        bio: "Architecting sub-2ms latency systems and resilient cloud infrastructures for global organizational impact.",
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
        order: 5
    }
];

const TESTIMONIALS_DATA = [
    {
        name: "Jonathan Wright",
        company: "Global Trade Corp",
        designation: "CTO",
        quote: "Felconis restored our technical authority. Their sub-2ms architecture handle our peak traffic without a single protocol exception. Truly ultra-premium engineering.",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    {
        name: "Sarah Chen",
        company: "NextZen Systems",
        designation: "Product Director",
        quote: "The visual logic and performance efficiency delivered by Felconis exceeded our institutional standards. They don't just write code; they craft digital dominance.",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
        name: "Marcus Aurelius",
        company: "Roman Digital",
        designation: "CEO",
        quote: "Our transition to a sovereign cloud architecture was flawless. The Felconis protocol for system optimization is the gold standard in the industry today.",
        photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
    }
];

const ASSETS_DATA = [
    {
        title: "Institutional Brand Kit 2025",
        category: "BRAND_KIT",
        size: "45.2 MB",
        type: "ZIP",
        url: "https://felconis.com/assets/brand-kit-2025.zip",
        status: "PUBLISHED"
    },
    {
        title: "Strategic Sales Playbook",
        category: "PRESENTATION",
        size: "12.8 MB",
        type: "PDF",
        url: "https://felconis.com/assets/sales-playbook.pdf",
        status: "PUBLISHED"
    }
];

async function main() {
    console.log('Start seeding...');

    try {
        // Clear existing dynamic data to ensure clean slate
        console.log('Clearing existing data...');
        await prisma.service.deleteMany();
        await prisma.asset.deleteMany();
        await prisma.lead.deleteMany();
        await prisma.teamMember.deleteMany();
        await prisma.testimonial.deleteMany();

        const hashedPassword = await bcrypt.hash('password123', 10);

        // Create Admin User if not exists
        const admin = await prisma.user.upsert({
            where: { email: 'admin@felconis.com' },
            update: {
                password: hashedPassword
            },
            create: {
                email: 'admin@felconis.com',
                password: hashedPassword,
                name: 'Mahdi Monir',
                role: 'ADMIN'
            }
        });

        // Seed Assets
        for (const asset of ASSETS_DATA) {
            await prisma.asset.create({
                data: asset
            });
        }

        // Seed Services
        for (const s of SERVICES_DATA) {
            await prisma.service.create({
                data: s as any
            });
        }

        // Seed Testimonials
        for (const t of TESTIMONIALS_DATA) {
            await prisma.testimonial.create({
                data: t
            });
        }

        // Seed Team Members
        for (const tm of TEAM_MEMBERS_DATA) {
            await prisma.teamMember.create({
                data: tm
            });
        }

        // Seed a demo partner
        const partnerPassword = await bcrypt.hash('partner123', 10);
        const demoPartner = await prisma.partner.upsert({
            where: { email: 'partner@institutional.com' },
            update: {
                status: 'APPROVED'
            },
            create: {
                email: 'partner@institutional.com',
                name: 'Institutional Partner A',
                password: partnerPassword,
                phone: '+880 1700 000000',
                status: 'APPROVED',
                commissionRate: 15.0,
                totalEarned: 25000.0
            }
        });

        // Seed Blog Category
        const intelligenceCategory = await prisma.blogCategory.upsert({
            where: { slug: 'intelligence' },
            update: {},
            create: {
                name: 'Strategic Intelligence',
                slug: 'intelligence'
            }
        });

        // Seed Static Blog Posts
        const staticBlogs = [
            {
                title: "Top 20 Best Software Companies in Bangladesh (2026)",
                slug: "best-software-companies-bangladesh-2026",
                content: `
                    <div id="executive-summary">
                        <p>Bangladesh's software industry has grown continuously with success over the past decade. Mordor Intelligence report says that the domestic IT market in Bangladesh is valued at approximately $9.44 billion. It is projected to reach $12.78 billion by 2031 with a CAGR of 6.25%.</p>
                        <p>Bangladesh is now a major destination in the global tech industry, employing around 750,000+ software professionals across 4,500+ firms. They are serving over 130+ countries worldwide, including the USA, EU, Japan, and the UK as top destinations.</p>
                    </div>

                    <div id="market-landscape">
                        <p>Among the industry leaders, Vivasoft Limited stands out for offering scalable software solutions, enterprise applications, and global tech services with success. Alongside this, some other software companies like Enosis Solutions, TigerIT, and BJIT are performing notably well.</p>
                    </div>

                    <div id="top-20-rankings">
                        <h2>Top 20 Software Companies in Bangladesh (Latest Ranking)</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Company</th>
                                    <th>Primary Specialization</th>
                                    <th>Employee Size</th>
                                    <th>Establish Year</th>
                                    <th>Clutch Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>1</td><td>Vivasoft Limited</td><td>Team augmentation, End-to-end software, Web/Mobile, MVP, ML & AI</td><td>300+</td><td>2016</td><td>5/5</td></tr>
                                <tr><td>2</td><td>Brain Station 23</td><td>Custom software development, Fintech, ERP, Cloud</td><td>850+</td><td>2006</td><td>5/5</td></tr>
                                <tr><td>3</td><td>Enosis Solutions</td><td>Full-stack application development, Testing</td><td>350+</td><td>2006</td><td>4.7/5</td></tr>
                                <tr><td>4</td><td>KAZ Software</td><td>AI-powered product engineering</td><td>150+</td><td>2004</td><td>0/5</td></tr>
                                <tr><td>5</td><td>BJIT</td><td>IT consulting and development, Offshore teams</td><td>750+</td><td>2001</td><td>5/5</td></tr>
                            </tbody>
                        </table>
                    </div>
                `,
                image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2070",
                categoryId: intelligenceCategory.id,
                authorId: admin.id,
                isStatic: true
            }
        ];

        for (const post of staticBlogs) {
            await prisma.blog.upsert({
                where: { slug: post.slug },
                update: post,
                create: post
            });
        }

        console.log('Seeding finished successfully.');
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
