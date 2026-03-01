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
