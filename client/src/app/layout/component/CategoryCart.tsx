import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdBlock } from "react-icons/md";

interface CategoryCardProps {
  catName: string;
  catCount: number;
  status: boolean;

  onEdit: () => void;
  onToggleStatus: () => void;
}

function CategoryCard({
  catName,
  catCount,
  status,
  onEdit,
  onToggleStatus,
}: CategoryCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold text-slate-800">{catName}</h3>

          <span className="text-sm text-slate-500">
            تعداد محصولات:
            <span className="mr-2 rounded-full bg-amber-100 px-2 py-1 font-semibold text-amber-700">
              {catCount}
            </span>
          </span>
        </div>
        <span
          className={`rounded-full border px-4 py-2 text-sm font-semibold ${
            status
              ? "border-green-500 bg-green-50 text-green-600"
              : "border-red-500 bg-red-50 text-red-600"
          }`}
        >
          {status ? "فعال" : "غیرفعال"}
        </span>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onEdit}
          className="flex-1 rounded-xl bg-blue-500 px-4 py-3 font-semibold text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95 flex items-center justify-center gap-2"
        >
          <FaEdit />
          ویرایش
        </button>

        <button
          onClick={onToggleStatus}
          className={`flex-1 rounded-xl px-4 py-3 font-semibold text-white transition-all duration-200 hover:shadow-md active:scale-95 flex items-center justify-center gap-2 ${
            status
              ? "bg-red-500 hover:bg-red-700"
              : "bg-green-500 hover:bg-green-700"
          }`}
        >
          <MdBlock />
          {status ? "غیرفعال کردن" : "فعال کردن"}
        </button>
      </div>
    </div>
  );
}

export default CategoryCard;
