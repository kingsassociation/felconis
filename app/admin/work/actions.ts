"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function upsertCaseStudy(formData: FormData) {
    const id = formData.get("id") as string | null;
    const title = formData.get("title") as string;
    const slug = formData.get("slug") as string;
    const clientName = formData.get("clientName") as string;
    const tag = formData.get("tag") as string;
    const stats = formData.get("stats") as string;
    const kpi = formData.get("kpi") as string;
    const duration = formData.get("duration") as string;
    const problem = formData.get("problem") as string;
    const strategy = formData.get("strategy") as string;
    const image = formData.get("image") as string;

    const executionRaw = formData.get("execution") as string;
    const execution = executionRaw ? executionRaw.split(",").map(f => f.trim()) : [];

    const resultsRaw = formData.get("results") as string;
    const results = resultsRaw ? resultsRaw.split(",").map(f => f.trim()) : [];

    const data = {
        title,
        slug,
        clientName,
        tag,
        stats,
        kpi,
        duration,
        problem,
        strategy,
        image,
        execution,
        results
    };

    if (id) {
        await prisma.caseStudy.update({
            where: { id },
            data
        });
    } else {
        await prisma.caseStudy.create({
            data
        });
    }

    revalidatePath("/admin/work");
    revalidatePath(`/work/${slug}`);
    revalidatePath("/work");
}

export async function deleteCaseStudy(id: string) {
    const study = await prisma.caseStudy.delete({
        where: { id }
    });
    revalidatePath("/admin/work");
    revalidatePath("/work");
    revalidatePath(`/work/${study.slug}`);
}
