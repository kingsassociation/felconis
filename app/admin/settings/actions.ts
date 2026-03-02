"use server";

import prisma from "@/lib/prisma";
import { getSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function updateAdminProfile(formData: FormData): Promise<void> {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") throw new Error("Unauthorized");

    const name = formData.get("name") as string;
    const image = formData.get("image") as string;

    await prisma.user.update({
        where: { id: session.id },
        data: { name, image }
    });

    revalidatePath("/admin/settings");
}

export async function updateAdminPassword(formData: FormData): Promise<void> {
    const session = await getSession();
    if (!session || session.role !== "ADMIN") throw new Error("Unauthorized");

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) throw new Error("Passwords do not match");

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: { id: session.id },
        data: { password: hashedPassword }
    });

    revalidatePath("/admin/settings");
}
