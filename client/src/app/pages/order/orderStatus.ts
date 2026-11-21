export const orderSteps = ["Pending", "Paid", "Preparing", "Shipped", "Delivered"] as const;

export const orderStatusMap: Record<string, { label: string; className: string; dot: string }> = {
  Pending: {
    label: "در انتظار پرداخت",
    className: "bg-amber-50 text-amber-800 ring-amber-200",
    dot: "bg-amber-500",
  },
  Paid: {
    label: "پرداخت‌شده",
    className: "bg-sky-50 text-sky-800 ring-sky-200",
    dot: "bg-sky-500",
  },
  Preparing: {
    label: "در حال آماده‌سازی",
    className: "bg-copper-50 text-copper-800 ring-copper-200",
    dot: "bg-copper-500",
  },
  Shipped: {
    label: "ارسال‌شده",
    className: "bg-indigo-50 text-indigo-800 ring-indigo-200",
    dot: "bg-indigo-500",
  },
  Delivered: {
    label: "تحویل داده‌شده",
    className: "bg-patina-50 text-patina-700 ring-patina-100",
    dot: "bg-patina-500",
  },
  Cancelled: {
    label: "لغو شده",
    className: "bg-red-50 text-red-700 ring-red-200",
    dot: "bg-red-500",
  },
};

export const getOrderStatus = (status: string) =>
  orderStatusMap[status] ?? {
    label: status,
    className: "bg-cream-100 text-ink-700 ring-line",
    dot: "bg-stone-400",
  };

export const cancellableStatuses = ["Pending", "Paid"];
