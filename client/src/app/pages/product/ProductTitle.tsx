import type { ReactNode } from "react";
import { formatNumber } from "../../../lib/utils/format";

interface ProductTitleProps {
  icon: ReactNode;
  title: string;
  count: number;
  caption?: string;
  tone?: "copper" | "red" | "stone";
}

const tones = {
  copper: "bg-copper-50 text-copper-600",
  red: "bg-red-50 text-red-600",
  stone: "bg-cream-100 text-stone-600",
};

function ProductTitle({ icon, title, count, caption, tone = "copper" }: ProductTitleProps) {
  return (
    <div className="card flex items-center gap-4 p-4">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${tones[tone]}`}>{icon}</span>
      <div className="min-w-0">
        <p className="text-xs font-medium text-stone-500">{title}</p>
        <p className="mt-0.5 text-xl font-extrabold text-ink tabular-nums">{formatNumber(count)}</p>
        {caption && <p className="text-[11px] text-stone-400">{caption}</p>}
      </div>
    </div>
  );
}

export default ProductTitle;
