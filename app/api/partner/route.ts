import { getPrisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    const prisma = getPrisma();
    try {
        const body = await req.json();
        const { name, email, phone, whatsapp, portfolio, social, skills, experience } = body;

        // Validation
        if (!name || !email || !phone) {
            return NextResponse.json(
                { error: "Missing required fields (Name, Email, Phone are mandatory)" },
                { status: 400 }
            );
        }

        // Save to Database
        const partner = await prisma.partner.create({
            data: {
                name,
                email,
                phone,
                whatsapp: whatsapp || null,
                portfolio: portfolio || null,
                social: social || null,
                skills: skills || null,
                experience: experience || null,
                status: "PENDING"
            }
        });

        return NextResponse.json({
            success: true,
            message: "Institutional Admission Protocol Initiated",
            protocolId: partner.id,
        });
    } catch (error: any) {
        console.error("Partner API Error:", error);

        if (error.code === 'P2002') {
            return NextResponse.json(
                { error: "Protocol Conflict: email already registered in system archives." },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: "Internal System Error" },
            { status: 500 }
        );
    }
}
