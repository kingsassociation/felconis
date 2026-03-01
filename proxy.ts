import { getSession, updateSession } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/admin", "/partner/portal"];
const publicRoutes = ["/portal/login", "/", "/about", "/services", "/work", "/careers", "/contact"];

export default async function proxy(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
    const isPublicRoute = publicRoutes.includes(path);

    const session = await getSession();

    // 1. Redirect to login if accessing protected route without session
    if (isProtectedRoute && !session) {
        return NextResponse.redirect(new URL("/portal/login", req.nextUrl));
    }

    // 2. Role-based access control
    if (session) {
        if (path.startsWith("/admin") && session.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/", req.nextUrl));
        }
        if (path.startsWith("/partner/portal") && session.role !== "PARTNER") {
            return NextResponse.redirect(new URL("/", req.nextUrl));
        }

        // 3. Redirect authenticated users away from login page
        if (path === "/portal/login") {
            const redirectUrl = session.role === "ADMIN" ? "/admin" : "/partner/portal";
            return NextResponse.redirect(new URL(redirectUrl, req.nextUrl));
        }
    }

    return await updateSession() || NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
