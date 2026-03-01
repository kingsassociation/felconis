"use server";

import prisma from "@/lib/prisma";
import { createSession } from "@/lib/session";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const loginType = formData.get("loginType") as "ADMIN" | "PARTNER";

    if (!email || !password) {
        return { error: "Missing institutional credentials." };
    }

    try {
        if (loginType === "ADMIN") {
            const user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                return { error: "Executive node not found." };
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            // Fallback for unhashed seed passwords during development
            const isFallbackValid = password === user.password;

            if (!isPasswordValid && !isFallbackValid) {
                return { error: "Access protocol rejected." };
            }

            await createSession(user.id, "ADMIN", user.email);
            redirect("/admin");
        } else {
            const partner = await prisma.partner.findUnique({
                where: { email },
            });

            if (!partner) {
                return { error: "Partner node not found." };
            }

            // Partners must have a password set to access the portal
            if (!partner.password) {
                return { error: "Portal access not activated for this partner." };
            }

            const isPasswordValid = await bcrypt.compare(password, partner.password);
            const isFallbackValid = password === partner.password;

            if (!isPasswordValid && !isFallbackValid) {
                return { error: "Access protocol rejected." };
            }

            if (partner.status !== "APPROVED") {
                return { error: "Institutional status: PENDING. Access gated." };
            }

            await createSession(partner.id, "PARTNER", partner.email);
            redirect("/partner/portal");
        }
    } catch (error: any) {
        if (error.message === "NEXT_REDIRECT") throw error;
        console.error("Auth error:", error);
        return { error: "System synchronization failure." };
    }
}

export async function logout() {
    // Logic handled by lib/session or directly here
    // For simplicity, we'll just redirect to the public node
    // and handle cookie removal in a dedicated route or using a cookie deletion logic
    // but let's implement it properly in a server action if possible
}
