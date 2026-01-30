export const IS_PROD = process.env.NODE_ENV === "production";
export const BASE_PATH = IS_PROD ? "/public-static" : "";

export const getAssetPath = (path: string) => {
    if (path.startsWith("http")) return path;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${BASE_PATH}${cleanPath}`;
};
