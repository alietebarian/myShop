import { FiEdit2, FiEye, FiEyeOff, FiFolder } from "react-icons/fi";
import { formatNumber } from "../../../lib/utils/format";

interface CategoryCardProps {
  catName: string;
  catCount: number;
  status: boolean;
  busy?: boolean;
  onEdit: () => void;
  onToggleStatus: () => void;
}

function CategoryCard({ catName, catCount, status, busy, onEdit, onToggleStatus }: CategoryCardProps) {
  return (
    <div className={`card flex flex-col p-5 transition-opacity ${busy ? "opacity-60" : ""}`}>
      <div className="flex items-start gap-3">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-xl ${status ? "bg-copper-50 text-copper-600" : "bg-cream-100 text-stone-400"}`}>
          <FiFolder />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-bold text-ink">{catName}</h3>
          <p className="mt-0.5 text-xs text-stone-500">{formatNumber(catCount)} محصول</p>
        </div>
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium ${
            status ? "bg-patina-50 text-patina-700" : "bg-cream-100 text-stone-600"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${status ? "bg-patina-500" : "bg-stone-400"}`} />
          {status ? "فعال" : "غیرفعال"}
        </span>
      </div>

      <div className="mt-5 flex gap-2 border-t border-line pt-4">
        <button type="button" onClick={onEdit} disabled={busy} className="btn btn-secondary btn-sm flex-1">
          <FiEdit2 /> ویرایش نام
        </button>
        <button
          type="button"
          onClick={onToggleStatus}
          disabled={busy}
          className={`btn btn-sm flex-1 border ${
            status ? "border-line bg-white text-stone-600 hover:bg-cream-100" : "border-patina-100 bg-patina-50 text-patina-700 hover:bg-patina-100"
          }`}
        >
          {status ? <FiEyeOff /> : <FiEye />}
          {status ? "غیرفعال کردن" : "فعال کردن"}
        </button>
      </div>
    </div>
  );
}

export default CategoryCard;
