"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function upsertTeamMember(data: any) {
    const { id, ...rest } = data;

    if (id && id !== "new") {
        await prisma.teamMember.update({
            where: { id },
            data: rest
        });
    } else {
        await prisma.teamMember.create({
            data: rest
        });
    }

    revalidatePath("/team");
    revalidatePath("/admin/team");
}

export async function deleteTeamMember(id: string) {
    await prisma.teamMember.delete({
        where: { id }
    });
    revalidatePath("/team");
    revalidatePath("/admin/team");
}

/* TESTIMONIAL ACTIONS */

export async function upsertTestimonial(data: any) {
    const { id, ...rest } = data;

    if (id && id !== "new") {
        await prisma.testimonial.update({
            where: { id },
            data: rest
        });
    } else {
        await prisma.testimonial.create({
            data: rest
        });
    }

    revalidatePath("/");
    revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(id: string) {
    await prisma.testimonial.delete({
        where: { id }
    });
    revalidatePath("/");
    revalidatePath("/admin/testimonials");
}
