"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updatePartnerStatus(formData: FormData) {
    const id = formData.get("id") as string;
    const status = formData.get("status") as string;

    await prisma.partner.update({
        where: { id },
        data: { status }
    });
    revalidatePath("/admin/partners");
}

export async function deletePartner(formData: FormData) {
    const id = formData.get("id") as string;

    await prisma.partner.delete({
        where: { id }
    });
    revalidatePath("/admin/partners");
}

export async function updatePartnerFinance(formData: FormData) {
    const id = formData.get("id") as string;
    const commissionRate = parseFloat(formData.get("commissionRate") as string);
    const totalEarned = parseFloat(formData.get("totalEarned") as string);

    await prisma.partner.update({
        where: { id },
        data: {
            commissionRate,
            totalEarned
        }
    });
    revalidatePath("/admin/partners");
}

export async function updatePartnerProfile(formData: FormData) {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const whatsapp = formData.get("whatsapp") as string;
    const image = formData.get("image") as string;
    const experience = formData.get("experience") as string;
    
    const skillsRaw = formData.get("skills") as string;
    const skills = skillsRaw ? skillsRaw.split(",").map(s => s.trim()).filter(Boolean) : [];
    
    const interestsRaw = formData.get("interests") as string;
    const interests = interestsRaw ? interestsRaw.split(",").map(s => s.trim()).filter(Boolean) : [];

    await prisma.partner.update({
        where: { id },
        data: {
            name,
            email,
            phone,
            whatsapp,
            image,
            experience,
            skills,
            interests
        }
    });

    revalidatePath("/admin/partners");
    revalidatePath(`/admin/partners/${id}`);
}
