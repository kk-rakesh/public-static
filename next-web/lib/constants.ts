export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const getAssetPath = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;

    // Ensure path has leading slash
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    // Concatenate and fix double slashes if any
    return `${BASE_PATH}${cleanPath}`.replace(/\/+/g, '/');
};

