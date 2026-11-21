import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { getImageUrl } from "../../../lib/hooks/getImageUrl";
import { formatNumber } from "../../../lib/utils/format";
import type { Product } from "../../../lib/types/types";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

function StatusPill({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium whitespace-nowrap ${
        active ? "bg-patina-50 text-patina-700" : "bg-cream-100 text-stone-600"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-patina-500" : "bg-stone-400"}`} />
      {active ? "فعال" : "غیرفعال"}
    </span>
  );
}

function Stock({ value }: { value: number }) {
  if (value <= 0) return <span className="font-semibold text-red-600">ناموجود</span>;
  if (value <= 3) return <span className="font-semibold text-amber-700">{formatNumber(value)} <span className="text-xs font-normal">(کم)</span></span>;
  return <span className="text-ink">{formatNumber(value)}</span>;
}

function Actions({ product, onEdit, onDelete }: { product: Product } & Omit<ProductTableProps, "products">) {
  return (
    <div className="flex items-center gap-1">
      <button type="button" onClick={() => onEdit(product)} aria-label={`ویرایش ${product.name}`} title="ویرایش" className="icon-btn h-9 w-9 text-stone-500">
        <FiEdit2 />
      </button>
      <button
        type="button"
        onClick={() => onDelete(product)}
        aria-label={`حذف ${product.name}`}
        title="حذف"
        className="icon-btn h-9 w-9 text-stone-500 hover:bg-red-50 hover:text-red-600"
      >
        <FiTrash2 />
      </button>
    </div>
  );
}

function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="card overflow-hidden">
      {/* Desktop table */}
      <table className="hidden w-full text-sm md:table">
        <thead className="border-b border-line bg-cream/70">
          <tr className="text-right text-xs font-semibold text-stone-500">
            <th className="px-5 py-3">محصول</th>
            <th className="px-5 py-3">دسته‌بندی</th>
            <th className="px-5 py-3">قیمت (تومان)</th>
            <th className="px-5 py-3">موجودی</th>
            <th className="px-5 py-3">وضعیت</th>
            <th className="w-24 px-5 py-3"><span className="sr-only">عملیات</span></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {products.map((product) => (
            <tr key={product.id} className="transition-colors hover:bg-cream/60">
              <td className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <img src={getImageUrl(product.image)} alt="" className="h-11 w-11 shrink-0 rounded-lg border border-line object-cover" />
                  <span className="line-clamp-1 font-semibold text-ink">{product.name}</span>
                </div>
              </td>
              <td className="px-5 py-3 text-stone-600">{product.categoryName}</td>
              <td className="px-5 py-3 font-semibold text-ink tabular-nums">{formatNumber(product.price)}</td>
              <td className="px-5 py-3"><Stock value={product.stock} /></td>
              <td className="px-5 py-3"><StatusPill active={product.status} /></td>
              <td className="px-5 py-3"><Actions product={product} onEdit={onEdit} onDelete={onDelete} /></td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile list */}
      <ul className="divide-y divide-line md:hidden">
        {products.map((product) => (
          <li key={product.id} className="flex gap-3 p-4">
            <img src={getImageUrl(product.image)} alt="" className="h-16 w-16 shrink-0 rounded-lg border border-line object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="line-clamp-2 text-sm font-semibold text-ink">{product.name}</p>
                <Actions product={product} onEdit={onEdit} onDelete={onDelete} />
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-stone-500">
                <span>{product.categoryName}</span>
                <span className="font-semibold text-ink">{formatNumber(product.price)} تومان</span>
                <span>موجودی: <Stock value={product.stock} /></span>
                <StatusPill active={product.status} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductTable;
