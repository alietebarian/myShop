import { FiEdit2 } from "react-icons/fi";
import { MdBlock, MdCheckCircleOutline } from "react-icons/md";

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
    <div className="rounded-xl border border-copper-100 bg-white p-5 transition-colors hover:border-copper-300">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <h3 className="font-bold text-ink">{catName}</h3>

          <span className="text-xs text-stone-600">
            {catCount.toLocaleString()} محصول
          </span>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${
            status
              ? "bg-patina-500/10 text-patina-600"
              : "bg-stone-400/10 text-stone-600"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              status ? "bg-patina-500" : "bg-stone-400"
            }`}
          />
          {status ? "فعال" : "غیرفعال"}
        </span>
      </div>

      <div className="mt-5 flex gap-2 border-t border-copper-50 pt-4">
        <button
          onClick={onEdit}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-copper-100 py-2.5 text-sm font-medium text-ink-700 transition-colors hover:border-copper-300 hover:bg-copper-50 hover:text-copper-700"
        >
          <FiEdit2 className="text-sm" />
          ویرایش
        </button>

        <button
          onClick={onToggleStatus}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition-colors ${
            status
              ? "border-red-200 text-red-600 hover:bg-red-50"
              : "border-patina-500/30 text-patina-600 hover:bg-patina-500/10"
          }`}
        >
          {status ? <MdBlock className="text-sm" /> : <MdCheckCircleOutline className="text-sm" />}
          {status ? "غیرفعال کردن" : "فعال کردن"}
        </button>
      </div>
    </div>
  );
}

export default CategoryCard;
