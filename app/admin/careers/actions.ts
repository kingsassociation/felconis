"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function upsertJob(formData: FormData) {
    const id = formData.get("id") as string | null;
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const department = formData.get("department") as string;
    const location = formData.get("location") as string;
    const type = formData.get("type") as string;
    const salary = formData.get("salary") as string;
    const overview = formData.get("overview") as string;
    const description = formData.get("description") as string;
    const active = formData.get("active") === "on";

    const requirementsRaw = formData.get("requirements") as string;
    const requirements = requirementsRaw ? requirementsRaw.split(",").map(f => f.trim()) : [];

    const benefitsRaw = formData.get("benefits") as string;
    const benefits = benefitsRaw ? benefitsRaw.split(",").map(f => f.trim()) : [];

    const responsibilitiesRaw = formData.get("responsibilities") as string;
    const responsibilities = responsibilitiesRaw ? responsibilitiesRaw.split(",").map(f => f.trim()) : [];

    const data = {
        title,
        slug,
        department,
        location,
        type,
        salary,
        overview,
        description,
        active,
        requirements,
        benefits,
        responsibilities
    };

    if (id) {
        await prisma.job.update({
            where: { id },
            data
        });
    } else {
        await prisma.job.create({
            data
        });
    }

    revalidatePath("/admin/careers");
    revalidatePath(`/careers/${slug}`);
    revalidatePath("/careers");
}

export async function deleteJob(id: string) {
    const job = await prisma.job.delete({
        where: { id }
    });
    revalidatePath("/admin/careers");
    revalidatePath("/careers");
    revalidatePath(`/careers/${job.slug}`);
}
