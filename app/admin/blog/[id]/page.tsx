import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import BlogForm from "./BlogForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params;
  
  const [categories, authors] = await Promise.all([
    prisma.blogCategory.findMany({ orderBy: { name: 'asc' } }),
    prisma.user.findMany({ where: { role: 'ADMIN' }, orderBy: { name: 'asc' } })
  ]);

  if (id === "new") {
    return (
      <div className="max-w-4xl mx-auto space-y-12">
        <div className="space-y-4">
           <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">BROADCAST <span className="text-brand">INTEL.</span></h1>
           <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">INITIALIZE A NEW INTELLIGENCE NODE</p>
        </div>
        <BlogForm categories={categories} authors={authors} />
      </div>
    );
  }

  const post = await prisma.blog.findUnique({
    where: { id }
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="space-y-4">
         <h1 className="text-4xl font-black uppercase tracking-tighter text-text-primary">CONFIGURE <span className="text-brand">INTEL.</span></h1>
         <p className="text-text-muted text-[10px] font-black uppercase tracking-widest">SYNCING DATA: {post.title}</p>
      </div>
      <BlogForm initialData={post} categories={categories} authors={authors} />
    </div>
  );
}
