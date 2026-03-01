import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const secretKey = "felconis-institutional-secret-protocol";
const key = new TextEncoder().encode(process.env.JWT_SECRET || secretKey);

export type SessionPayload = {
    id: string;
    role: "ADMIN" | "PARTNER";
    email: string;
    expiresAt: Date;
};

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const { payload } = await jwtVerify(input, key, {
        algorithms: ["HS256"],
    });
    return payload;
}

export async function createSession(id: string, role: "ADMIN" | "PARTNER", email: string) {
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 hours
    const session = await encrypt({ id, role, email, expiresAt });

    const cookieStore = await cookies();
    cookieStore.set("felconis_session", session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        sameSite: "lax",
        path: "/",
    });
}

export async function updateSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("felconis_session")?.value;
    if (!session) return null;

    const parsed = await decrypt(session);
    parsed.expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);

    const res = NextResponse.next();
    res.cookies.set({
        name: "felconis_session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expiresAt,
    });

    return res;
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("felconis_session");
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("felconis_session")?.value;
    if (!session) return null;
    return await decrypt(session);
}
