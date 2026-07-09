import React from "react";

interface ProductTitleProps {
  icon: React.ReactNode;
  title: string;
  count: number;
}

function ProductTitle({ icon, title, count }: ProductTitleProps) {
  return (
    <div className="flex items-center justify-between rounded-sm border border-orange-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-amber-500 text-2xl text-white shadow-md">
          {icon}
        </div>
      </div>

      <div className="rounded-xl bg-orange-50 px-5 py-3 text-center ">
        <p className="text-2xl font-bold text-orange-600">{count}</p>
        <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
      </div>
    </div>
  );
}

export default ProductTitle;
