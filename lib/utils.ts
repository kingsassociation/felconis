import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function stripHtml(html?: string | null) {
    if (!html) return "";

    // 1. Replace block elements with spaces to prevent words from sticking together
    const withSpaces = html.replace(/<\/?[bcdefghijlkmonpqrstuvwz][^>]*>/gi, " ");

    // 2. Strip all remaining tags
    const stripped = withSpaces.replace(/<[^>]*>?/gm, "");

    // 3. Decode common HTML entities
    const decoded = stripped
        .replace(/&nbsp;/g, " ")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");

    // 4. Cleanup white spaces
    return decoded.replace(/\s+/g, " ").trim();
}
