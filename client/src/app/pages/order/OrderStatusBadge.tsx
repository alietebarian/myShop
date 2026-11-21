import { getOrderStatus } from "./orderStatus";

export default function OrderStatusBadge({ status }: { status: string }) {
  const { label, className, dot } = getOrderStatus(status);
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
