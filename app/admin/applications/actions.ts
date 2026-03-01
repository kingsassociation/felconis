"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteApplication(id: string) {
    await prisma.application.delete({
        where: { id }
    });
    revalidatePath("/admin/applications");
}
