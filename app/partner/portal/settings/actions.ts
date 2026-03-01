"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updatePartnerProfile(formData: FormData) {
    const session = await getSession();
    if (!session || session.role !== "PARTNER") {
        return { error: "Unauthorized institutional access." };
    }

    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const portfolio = formData.get("portfolio") as string;
    const experience = formData.get("experience") as string;
    const password = formData.get("password") as string;

    try {
        const data: any = {
            name,
            phone,
            whatsapp,
            portfolio,
            experience,
        };

        if (password && password.length >= 8) {
            data.password = await bcrypt.hash(password, 10);
        }

        await prisma.partner.update({
            where: { id: session.id },
            data,
        });

        revalidatePath("/partner/portal/settings");
        revalidatePath("/partner/portal");

        return { success: "Institutional Identity Synchronized." };
    } catch (error) {
        console.error("Profile update error:", error);
        return { error: "Update protocol failure." };
    }
}
