import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export default function EmptyState({ icon, title, description, action, className = "" }: EmptyStateProps) {
  return (
    <div className={`card flex flex-col items-center px-6 py-16 text-center ${className}`}>
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-copper-50 text-3xl text-copper-600">
        {icon}
      </div>
      <h2 className="text-lg font-bold text-ink">{title}</h2>
      {description && <p className="mt-2 max-w-sm text-sm leading-7 text-stone-600">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
