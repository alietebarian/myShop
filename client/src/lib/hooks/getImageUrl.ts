export function getImageUrl(path?: string | null): string {
  if (!path) return "/placeholder-image.png";

  if (path.startsWith("http")) return path;

  return `${import.meta.env.VITE_FILE_BASE_URL}${path}`;
}