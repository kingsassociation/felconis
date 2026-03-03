"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateLeadStatus(id: string, status: string) {
    await prisma.lead.update({
        where: { id },
        data: { status }
    });
    revalidatePath("/admin/leads");
    revalidatePath("/admin");
}

export async function updateLeadStatusAction(formData: FormData) {
    const id = formData.get("id") as string;
    const status = formData.get("status") as string;
    await updateLeadStatus(id, status);
}

export async function deleteLead(id: string) {
    await prisma.lead.delete({
        where: { id }
    });
    revalidatePath("/admin/leads");
    revalidatePath("/admin");
}
