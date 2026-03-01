"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAsset(formData: FormData) {
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const size = formData.get("size") as string;
    const type = formData.get("type") as string;
    const url = formData.get("url") as string;

    try {
        await prisma.asset.create({
            data: {
                title,
                category,
                size,
                type,
                url,
                status: "PUBLISHED"
            }
        });

        revalidatePath("/admin/partners/assets");
        revalidatePath("/partner/portal/assets");
        return { success: "Strategic Asset Published." };
    } catch (error) {
        console.error("Asset creation error:", error);
        return { error: "Publication protocol failure." };
    }
}

export async function deleteAsset(id: string) {
    try {
        await prisma.asset.delete({
            where: { id }
        });

        revalidatePath("/admin/partners/assets");
        revalidatePath("/partner/portal/assets");
        return { success: "Strategic Asset Decommissioned." };
    } catch (error) {
        console.error("Asset deletion error:", error);
        return { error: "Decommissioning protocol failure." };
    }
}
