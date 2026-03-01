import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, resume, portfolio, message, jobId } = body;

        // Validation
        if (!name || !email || !resume || !jobId) {
            return NextResponse.json(
                { error: "Protocol Error: Missing mandatory identification fields." },
                { status: 400 }
            );
        }

        // Save to Database via Prisma
        const application = await prisma.application.create({
            data: {
                name,
                email,
                resume,
                portfolio: portfolio || null,
                message: message || null,
                jobId,
            }
        });

        return NextResponse.json({
            success: true,
            message: "Talent Acquisition Signal Synchronized",
            protocolId: application.id,
        });
    } catch (error) {
        console.error("Application API Error:", error);
        return NextResponse.json(
            { error: "Internal System Alignment Error" },
            { status: 500 }
        );
    }
}
