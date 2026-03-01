"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function upsertService(formData: FormData) {
    const id = formData.get("id") as string | null;
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const subtitle = formData.get("subtitle") as string;
    const description = formData.get("description") as string;
    const category = formData.get("category") as string;
    const icon = formData.get("icon") as string;
    const image = formData.get("image") as string;

    // Handle features and highlights as strings or JSON
    const featuresRaw = formData.get("features") as string;
    const features = featuresRaw ? featuresRaw.split(",").map(f => f.trim()) : [];

    const highlightsRaw = formData.get("highlights") as string;
    let highlights = [];
    try {
        highlights = JSON.parse(highlightsRaw);
    } catch (e) {
        // Fallback if not JSON
    }

    const data = {
        title,
        slug,
        subtitle,
        description,
        category,
        icon,
        image,
        features,
        highlights
    };

    if (id) {
        await prisma.service.update({
            where: { id },
            data
        });
    } else {
        await prisma.service.create({
            data
        });
    }

    revalidatePath("/admin/services");
    revalidatePath(`/services/${slug}`);
    revalidatePath("/services");
}

export async function deleteService(id: string) {
    const service = await prisma.service.delete({
        where: { id }
    });
    revalidatePath("/admin/services");
    revalidatePath("/services");
    revalidatePath(`/services/${service.slug}`);
}
