import React from "react";

interface ProductTitleProps {
  icon: React.ReactNode;
  title: string;
  count: number;
}

function ProductTitle({ icon, title, count }: ProductTitleProps) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-copper-100 bg-white p-5">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-copper-50 text-xl text-copper-700">
        {icon}
      </div>

      <div className="flex flex-col">
        <span className="text-xs font-medium text-stone-600">{title}</span>
        <span className="text-xl font-bold text-ink">
          {count.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

export default ProductTitle;
