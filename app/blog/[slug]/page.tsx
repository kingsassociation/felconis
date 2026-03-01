import prisma from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogContent from "./BlogContent";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.blog.findUnique({
    where: { slug },
    include: { author: true }
  });

  if (!post) return { title: "Insight Not Found" };

  return {
    title: `${post.title} | Felconis Intelligence`,
    description: post.content.substring(0, 160),
    openGraph: {
      title: `${post.title} | Felconis Institutional Strategy`,
      description: post.content.substring(0, 160),
      images: post.image ? [post.image] : [],
      type: "article",
    },
  };
}

export default async function BlogPostDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const post = await prisma.blog.findUnique({
    where: { slug },
    include: { author: true }
  });

  if (!post) {
    notFound();
  }

  // Format date to match existing component expectation
  const formattedPost = {
    ...post,
    date: post.createdAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    author: post.author.name || "Institutional Lead"
  };

  return <BlogContent slug={slug} post={formattedPost} />;
}
