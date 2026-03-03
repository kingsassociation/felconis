"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function upsertBlogPost(formData: FormData) {
    const id = formData.get("id") as string | null;
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const content = formData.get("content") as string;
    const image = formData.get("image") as string;
    const categoryId = formData.get("categoryId") as string;
    const authorId = formData.get("authorId") as string;
    const isStatic = formData.get("isStatic") === "on";

    const data = {
        title,
        slug,
        content,
        image,
        categoryId,
        authorId,
        isStatic
    };

    if (id) {
        await prisma.blog.update({
            where: { id },
            data
        });
    } else {
        await prisma.blog.create({
            data
        });
    }

    revalidatePath("/admin/blog");
    revalidatePath(`/blog/${slug}`);
    revalidatePath("/blog");
}

export async function deleteBlogPost(id: string) {
    const post = await prisma.blog.delete({
        where: { id }
    });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
}
