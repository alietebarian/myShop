export const orderStatusMap: Record<
  string,
  { label: string; className: string }
> = {
  Pending: {
    label: "در انتظار پرداخت",
    className: "bg-yellow-100 text-yellow-700",
  },
  Paid: {
    label: "پرداخت‌شده",
    className: "bg-blue-100 text-blue-700",
  },
  Preparing: {
    label: "در حال آماده‌سازی",
    className: "bg-purple-100 text-purple-700",
  },
  Shipped: {
    label: "ارسال‌شده",
    className: "bg-indigo-100 text-indigo-700",
  },
  Delivered: {
    label: "تحویل داده‌شده",
    className: "bg-green-100 text-green-700",
  },
  Cancelled: {
    label: "لغو شده",
    className: "bg-red-100 text-red-700",
  },
};

export const getOrderStatus = (status: string) =>
  orderStatusMap[status] ?? {
    label: status,
    className: "bg-gray-100 text-gray-700",
  };

export const cancellableStatuses = ["Pending", "Paid"];