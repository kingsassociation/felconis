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
        title: "Growth Engine",
        slug: "growth",
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
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
        category: "MARKETING"
    },
    {
        title: "Design Systems",
        slug: "design",
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
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=2070",
        category: "SOFTWARE"
    },
    {
        title: "Digital Infrastructure",
        slug: "engineering",
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
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070",
        category: "SOFTWARE"
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
            await prisma.service.upsert({
                where: { slug: s.slug },
                update: s as any,
                create: s as any
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

        // Seed some leads for the partner
        // Note: Prisma Lead model uses individual status, partner association is optional
        await prisma.lead.createMany({
            data: [
                { name: "Zylan Group", email: "corp@zylan.com", message: "Institutional growth referral.", partnerId: demoPartner.id, status: "NEW" },
                { name: "Nexis Retail", email: "growth@nexis.io", message: "Digital infra sync.", partnerId: demoPartner.id, status: "NEW" },
            ]
        });

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
