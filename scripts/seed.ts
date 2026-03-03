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
                                <tr><td>6</td><td>Cefalo Bangladesh Limited</td><td>Dedicated developer provider</td><td>250+</td><td>2010</td><td>0/5</td></tr>
                                <tr><td>7</td><td>LeadSoft Bangladesh Limited</td><td>Enterprise application development</td><td>300+</td><td>1999</td><td>5/5</td></tr>
                                <tr><td>8</td><td>REVE Systems</td><td>Telecom-focused custom software & outsourcing</td><td>400+</td><td>2003</td><td>4.7/5</td></tr>
                                <tr><td>9</td><td>Pridesys IT</td><td>ERP software solutions</td><td>300+</td><td>2013</td><td>0/5</td></tr>
                                <tr><td>10</td><td>Riseup Labs</td><td>Next-generation global IT service, AR/VR</td><td>200+</td><td>2009</td><td>4.9/5</td></tr>
                                <tr><td>11</td><td>TechNext</td><td>Staff augmentation, Digital solution development</td><td>70+</td><td>2012</td><td>0/5</td></tr>
                                <tr><td>12</td><td>Flyte Solutions</td><td>Custom software development, Product engineering</td><td>50+</td><td>2012</td><td>5/5</td></tr>
                                <tr><td>13</td><td>Mediusware</td><td>Full-stack software development, FinTech specialist</td><td>120+</td><td>2015</td><td>4.9/5</td></tr>
                                <tr><td>14</td><td>Bdtask</td><td>Custom software development services</td><td>100+</td><td>2012</td><td>5/5</td></tr>
                                <tr><td>15</td><td>Dynamic Solution Innovators</td><td>Staff augmentation, Machine Learning</td><td>300+</td><td>2001</td><td>5/5</td></tr>
                                <tr><td>16</td><td>TigerIT</td><td>End-to-end credential management solutions</td><td>200+</td><td>2000</td><td>n/a</td></tr>
                                <tr><td>17</td><td>Soft BD Limited</td><td>E-Governance Solutions</td><td>150+</td><td>2006</td><td>4.4/5</td></tr>
                                <tr><td>18</td><td>Craftsmen</td><td>Software team extension</td><td>50+</td><td>2018</td><td>0/5</td></tr>
                                <tr><td>19</td><td>Ontik Technology</td><td>End-to-end product development</td><td>150+</td><td>2016</td><td>4.8/5</td></tr>
                                <tr><td>20</td><td>Smart Software Ltd</td><td>Website & eCommerce development</td><td>80+</td><td>2014</td><td>5/5</td></tr>
                            </tbody>
                        </table>

                        <h3>1. Vivasoft Limited</h3>
                        <p>Vivasoft is one of the best software companies in Bangladesh, trusted by 50+ global brands, including European scale-ups and digital entertainment platforms. Their core proposition is 300+ engineers skilled in 20+ tech stacks, delivering 10X faster solutions with 99.9% release quality.</p>
                        <p>The company maintains 88% employee retention, ensuring the same senior engineers stay on your project long-term. With a 4.1/5 employee rating on Glassdoor and an impressive 5/5 client rating on Clutch, the company delivers world-class engineering at 60%-70% cost savings compared to Western markets.</p>

                        <h3>2. Brain Station 23</h3>
                        <p>Brain Station 23 is a titan in the Bangladeshi software industry, known for delivering cutting-edge solutions in fintech, e-commerce, and cloud computing. With over 800 engineers, they serve clients in over 137 countries and contribute significantly to the sector's projected growth.</p>

                        <h3>3. Enosis Solutions</h3>
                        <p>Enosis Solutions operates as a true extension of your existing development team rather than an external vendor. This is one of the top IT firms in Bangladesh, combining 350+ engineers with hands-on experience to integrate directly into your workflows and milestones.</p>
                    </div>

                    <div id="selection-methodology">
                        <h2>How We Ranked Top 20 Software Companies in Bangladesh?</h2>
                        <ul>
                            <li><strong>Expertise & Technical Proficiency:</strong> We evaluated proven experience with the confirmation that each of the companies has certified professionals.</li>
                            <li><strong>Technology Stack & Team Strength:</strong> Beyond just experience, we went through the depth of their knowledge of modern tech stacks.</li>
                            <li><strong>Collaboration Model:</strong> Project success mostly depends on how teams engage with clients.</li>
                            <li><strong>Innovation & AI Adaptability:</strong> We assessed each company's ability to adopt AI and automation.</li>
                        </ul>
                    </div>

                    <div id="future-outlook">
                        <h2>Evolution of the Software Industry</h2>
                        <p>The software journey started in Bangladesh with the installation of an IBM 1620 mainframe. By early 2025, BASIS reports listed 2,650 ICT businesses. The country now has over 1 million active freelancers, enough to say that it is a global freelancing powerhouse.</p>
                    </div>

                    <div id="faq">
                        <h2>FAQs About Software Companies in Bangladesh</h2>
                        <p><strong>How Many Software Companies Are There in Bangladesh?</strong> There are over 4,500 registered software and IT companies in Bangladesh as of 2026, employing more than 400,000 professionals.</p>
                    </div>
                `,
                image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2070",
                categoryId: intelligenceCategory.id,
                authorId: admin.id,
                isStatic: true
            },
            {
                title: "Top 20 Best Software Companies in Bangladesh: 2026 Latest Ranking",
                slug: "top-software-development-firms-bangladesh",
                content: `
                    <div id="executive-summary">
                        <p>2,650 ICT businesses are listed in the Bangladesh Association of Software and Information Services (BASIS) reports as of early 2025. Bangladesh's ICT exports crossed $1.9 billion in 2024, reflecting the growing global trust in Bangladeshi engineering capabilities.</p>
                        <p>One thing is clear: Bangladesh is becoming a global software development hub. Global companies from America, the United Kingdom, the European Union, and Australia are outsourcing their software development projects to BD software companies for enterprise-grade quality.</p>
                    </div>

                    <div id="market-landscape">
                        <p>More than 300,000+ IT professionals are currently working in the country. Over 50,000+ developers work in software development, cloud, mobile, AI, and cybersecurity. Bangladeshi IT companies now serve clients in 130+ countries, moving from low-cost outsourcing to high-value engineering partnerships.</p>
                    </div>

                    <div id="top-20-rankings">
                        <h2>List of Top 20 Best Software Companies in Bangladesh: 2026 Latest Ranking</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Rank</th>
                                    <th>Company Name</th>
                                    <th>Known For</th>
                                    <th>Company Size (LinkedIn)</th>
                                    <th>Business Years</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>1</td><td>Brain Station 23</td><td>Web & Mobile App, Custom Software, AI-First, FinTech</td><td>950</td><td>19 Y</td></tr>
                                <tr><td>2</td><td>Vivasoft</td><td>Team Augmentation, Enterprise Solutions</td><td>264</td><td>9 Y</td></tr>
                                <tr><td>3</td><td>Enosis</td><td>Custom Software Development</td><td>450</td><td>19 Y</td></tr>
                                <tr><td>4</td><td>LeadSoft</td><td>Mobile applications, ERP</td><td>54</td><td>26 Y</td></tr>
                                <tr><td>5</td><td>Cefalo</td><td>Custom Software Design and Architecture</td><td>200</td><td>15 Y</td></tr>
                                <tr><td>6</td><td>Kaz Software</td><td>Software Development, AI-Powered</td><td>147</td><td>21 Y</td></tr>
                                <tr><td>7</td><td>BJIT</td><td>Offshore Development Teams</td><td>49</td><td>24 Y</td></tr>
                                <tr><td>8</td><td>REVE Systems</td><td>Telecommunication App Development</td><td>200</td><td>22 Y</td></tr>
                                <tr><td>9</td><td>SELISE Digital Platforms</td><td>Staff Augmentation, Enterprise Platforms</td><td>616</td><td>14 Y</td></tr>
                                <tr><td>10</td><td>Riseup Labs</td><td>App Development for Govt & Organization</td><td>257</td><td>13 Y</td></tr>
                                <tr><td>11</td><td>Soft BD Limited</td><td>E-commerce App Development</td><td>134</td><td>19 Y</td></tr>
                                <tr><td>12</td><td>South Tech</td><td>Software Development</td><td>114</td><td>25 Y</td></tr>
                                <tr><td>13</td><td>Pridesys IT</td><td>eLearning Solution, ERP</td><td>141</td><td>12 Y</td></tr>
                                <tr><td>14</td><td>Dream 71 Bangladesh</td><td>e-Governance Solution</td><td>109</td><td>11 Y</td></tr>
                                <tr><td>15</td><td>Nascenia</td><td>Rails Web Development</td><td>68</td><td>14 Y</td></tr>
                                <tr><td>16</td><td>Datasoft Systems</td><td>Software Development</td><td>424</td><td>24 Y</td></tr>
                                <tr><td>17</td><td>Dynamic Solution Innovators</td><td>AI Development, Staff Augmentation</td><td>289</td><td>25 Y</td></tr>
                                <tr><td>18</td><td>TigerIT</td><td>App Development for Government Project</td><td>351</td><td>18 Y</td></tr>
                                <tr><td>19</td><td>BD Task Ltd</td><td>Custom Software Solution</td><td>155</td><td>10 Y</td></tr>
                                <tr><td>20</td><td>Smart Software Ltd</td><td>Account Management Software</td><td>83</td><td>11 Y</td></tr>
                            </tbody>
                        </table>

                        <h3>1. Brain Station 23 – Best Software Company in Bangladesh</h3>
                        <p>Brain Station 23 is recognized as the top software company in Bangladesh for 2026. With over 950 engineers, they are a titan in the industry, known for delivering cutting-edge solutions in fintech, e-commerce, and cloud computing. They have gained worldwide exposure for consistent delivery across 130+ countries.</p>
                        
                        <h3>2. Vivasoft</h3>
                        <p>Vivasoft Limited is the 2nd pick of our Top 20 ranking. They have shown strong commitment to end-to-end custom software development. Established in 2016, they have completed 80+ successful projects and are experienced in digital products and MVP services.</p>

                        <h3>3. Enosis</h3>
                        <p>Enosis Solution is a reliable software development and testing service provider. Established in 2003, they offer custom software development, web application development, and quality assurance & testing.</p>
                    </div>

                    <div id="selection-methodology">
                        <h2>What are the Top 20 Best Software Companies in Bangladesh?</h2>
                        <p>Below is a practical breakdown of each company—what they do best, typical services, and key details that help you shortlist faster. We evaluated companies based on industry experience, technical expertise, client portfolio, and customer feedback.</p>
                    </div>

                    <div id="future-outlook">
                        <h2>Rise of the Software Development Companies</h2>
                        <p>Nowadays, international businesses rely on top Bangladeshi software development companies for enterprise-grade quality. Best software development companies like Brain Station 23 have gained worldwide exposure for consistent delivery.</p>
                    </div>
                `,
                image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2070",
                categoryId: intelligenceCategory.id,
                authorId: admin.id,
                isStatic: true
            },
            {
                title: "The Future of AI Engineering in Bangladesh 2026",
                slug: "future-of-ai-engineering-bangladesh-2026",
                content: `
                    <div id="executive-summary">
                        <p>As we move into 2026, Bangladesh is pivoting from traditional software outsourcing to high-end AI engineering. The national strategic focus on "Smart Bangladesh 2041" has accelerated the adoption of machine learning and autonomous systems across the domestic industry.</p>
                        <p>The transition is marked by a shift from simple automation to complex, cognitive infrastructure that powers global enterprises.</p>
                    </div>

                    <div id="market-landscape">
                        <h2>Current AI Infrastructure in BD</h2>
                        <p>Top-tier firms like Vivasoft and Brain Station 23 have established dedicated AI labs focusing on LLM fine-tuning, computer vision for industrial automation, and predictive analytics for global fintech partners.</p>
                        <p>The government's launch of the National AI Strategy 2.0 has provided the necessary regulatory framework and funding to support large-scale AI research and development.</p>
                    </div>

                    <div id="top-20-rankings">
                        <h2>Key AI Engineering Pillars</h2>
                        <ul>
                            <li><strong>LLM Customization:</strong> Fine-tuning open-source models for domain-specific industrial applications.</li>
                            <li><strong>RAG Architectures:</strong> Implementing Retrieval-Augmented Generation for enterprise knowledge management.</li>
                            <li><strong>Computer Vision:</strong> Deploying edge-AI for manufacturing quality control and security.</li>
                            <li><strong>Predictive Analytics:</strong> Leveraging big data for real-time market forecasting and risk assessment.</li>
                        </ul>
                    </div>

                    <div id="selection-methodology">
                        <h2>Talent Maturity</h2>
                        <p>By 2026, the local talent pool has matured significantly. More than 20,000 engineers are now specialized in AI-related disciplines, including data engineering, model optimization, and AI ethics.</p>
                        <p>Collaborations between industry leaders and top technical universities have ensured a steady pipeline of world-class AI practitioners.</p>
                    </div>

                    <div id="future-outlook">
                        <h2>Institutional Outlook</h2>
                        <p>The transition to AI engineering is not just a trend but a requirement for maintaining global technical authority. Organizations that fail to integrate AI into their core logic by 2027 will find themselves at a structural disadvantage in the global market.</p>
                    </div>

                    <div id="faq">
                        <h2>AI Engineering FAQ</h2>
                        <p><strong>Is Bangladesh ready for industrial AI?</strong> Yes, with 2026 seeing the launch of multiple GPU-accelerated data centers and a mature engineering workforce, the infrastructure is ready for complex AI deployments.</p>
                    </div>
                `,
                image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070",
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
