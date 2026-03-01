import prisma from "@/lib/prisma";
import { Metadata } from "next";
import BlogListContent from "./BlogListContent";

export const metadata: Metadata = {
  title: "Intelligence | Felconis Growth Insights",
  description: "Strategic diagnostics, technical engineering audits, and algorithmic acquisition protocols.",
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    prisma.blog.findMany({
      include: { 
        category: true,
        author: true 
      },
      orderBy: { createdAt: 'desc' }
    }),
    prisma.blogCategory.findMany({
      orderBy: { name: 'asc' }
    })
  ]);

  // Format date and author for the component
  const formattedPosts = posts.map((post: any) => ({
    ...post,
    date: post.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    author: post.author.name || "Institutional Lead",
    excerpt: post.content.substring(0, 160) + "..."
  }));

  return <BlogListContent initialPosts={formattedPosts} categories={categories} />;
}
