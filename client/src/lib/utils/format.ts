const faNumber = new Intl.NumberFormat("fa-IR");

/** 1250000 -> "۱٬۲۵۰٬۰۰۰" */
export function formatNumber(value: number | null | undefined): string {
  return faNumber.format(value ?? 0);
}

/** 1250000 -> "۱٬۲۵۰٬۰۰۰ تومان" */
export function formatPrice(value: number | null | undefined): string {
  return `${formatNumber(value)} تومان`;
}

export function formatDate(value: string | Date): string {
  return new Date(value).toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(value: string | Date): string {
  return new Date(value).toLocaleString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Short, human-friendly order reference from a GUID. */
export function shortId(id: string): string {
  return id.replace(/-/g, "").slice(0, 8).toUpperCase();
}
