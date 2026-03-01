/**
 * Cloudinary Media Protocol - Felconis Institutional Standard
 * 
 * Provides unified media synchronization with a single high-performance preset.
 * All assets are organized under the 'felconis' parent directory.
 */

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dcbpwzeha";
const INSTITUTIONAL_PRESET = "felconis";
const INSTITUTIONAL_FOLDER = "felconis";

/**
 * Institutional Transformation Protocol:
 * - auto format & quality
 * - fill cropping
 * - gravity auto
 */
const INSTITUTIONAL_TRANSFORMATION = "c_fill,g_auto,q_auto,f_auto";

/**
 * Generates a Cloudinary URL with the institutional 'felconis' protocol.
 * Ensures all assets are correctly prefixed with the 'felconis/' folder.
 */
export function getCloudinaryUrl(url: string, transformation: string = INSTITUTIONAL_TRANSFORMATION): string {
    if (!url) return "";

    // Handle generic strings (Public IDs)
    if (!url.includes("cloudinary.com") && !url.startsWith("http")) {
        // Ensure folder prefix
        const publicId = url.startsWith(`${INSTITUTIONAL_FOLDER}/`)
            ? url
            : `${INSTITUTIONAL_FOLDER}/${url}`;

        return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformation}/${publicId}`;
    }

    // Handle full Cloudinary URLs
    if (url.includes("cloudinary.com")) {
        const parts = url.split("/upload/");
        if (parts.length === 2) {
            // Extract current transformation and public ID
            const [currentTransform, path] = parts[1].split(/\/(.+)/);

            // If the path already includes the folder prefix, keep it, otherwise add it
            const finalPath = path.startsWith(`${INSTITUTIONAL_FOLDER}/`)
                ? path
                : `${INSTITUTIONAL_FOLDER}/${path}`;

            return `${parts[0]}/upload/${transformation}/${finalPath}`;
        }
    }

    // Fallback for non-Cloudinary external URLs (no transformation possible)
    return url;
}
