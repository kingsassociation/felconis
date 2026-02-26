import { Metadata } from "next";
import BlogContent from "./BlogContent";

const BLOG_POSTS = [
  {
    title: "Engineering Growth: Why Traditional Marketing is Dying",
    excerpt: "In a world driven by algorithms and sub-second precision, traditional creative agencies are falling behind. Here's why you need an engineering-first approach.",
    category: "Strategy",
    author: "Mahdi Monir",
    date: "Feb 15, 2026",
    slug: "engineering-growth-philosophy",
    image: "https://images.unsplash.com/photo-1519389950473-47002064a126?auto=format&fit=crop&q=80&w=2070",
    content: `
      <p>The digital landscape is undergoing a fundamental shift. For decades, "marketing" was synonymous with creativity—catchy slogans, beautiful imagery, and emotional storytelling. While these elements still hold value, the <strong>mechanism of delivery</strong> has changed entirely.</p>
      
      <h3>The Algorithmic Reality</h3>
      <p>Today, your growth is governed by complex mathematical models. Whether it's the Google Search algorithm, Meta's ad auction logic, or TikTok's recommendation engine, these systems don't care about your mood board. They care about data, signals, and technical precision.</p>
      
      <p>This is where the traditional agency model fails. They treat digital platforms as canvas, when they should be treating them as <strong>infrastructure</strong>. When you separate "the creative" from "the implementation," you create friction. In an environment where sub-second latency and attribution accuracy determine ROI, friction is fatal.</p>
      
      <h3>Enter Growth Engineering</h3>
      <p>At Felconis, we view growth as an engineering problem. This means:</p>
      <ul>
        <li><strong>Integrated Loops:</strong> Copy is optimized in real-time based on conversion data pipelines.</li>
        <li><strong>Technical Dominance:</strong> SEO is treated as search node optimization, ensuring site architecture is perfectly aligned with crawler logic.</li>
        <li><strong>Sub-Second UX:</strong> We treat load times as a primary conversion factor, knowing that every 100ms of delay kills revenue.</li>
      </ul>
      
      <p>The companies that will dominate the next decade are the ones that stop "doing marketing" and start <strong>engineering growth systems</strong>. The era of the generalist agency is over. The era of the Growth Architect has begun.</p>
    `
  },
  {
    title: "Advanced Search Strategies: Beyond Keywords and Backlinks",
    excerpt: "Learn how we build automated content pipelines and technical SEO infrastructure that dominates enterprise Search Results.",
    category: "Marketing",
    author: "SEO Lead",
    date: "Feb 12, 2026",
    slug: "advanced-search-strategy",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
    content: `
      <p>Technical SEO is no longer about meta tags and keyword density. It is about <strong>semantic authority mapping</strong> and technical site architecture that aligns with modern crawler logic.</p>
      <h3>The Architecture of Authority</h3>
      <p>We treat every page as a node in a knowledge graph. By architecting content clusters that demonstrate deep topic coverage, we build institutional trust with search engines.</p>
    `
  }
];

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug) || BLOG_POSTS[0];

  return {
    title: `${post.title} | Felconis Intelligence`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | Felconis Institutional Strategy`,
      description: post.excerpt,
      images: [post.image],
      type: "article",
    },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = BLOG_POSTS.find(p => p.slug === slug) || BLOG_POSTS[0];

  return <BlogContent slug={slug} post={post} />;
}
