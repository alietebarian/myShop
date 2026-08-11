import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { getImageUrl } from "../../../lib/hooks/getImageUrl";
import type { Product } from "../../../lib/types/types";

interface ProductTableProps {
  products: Product[];
  onEdit: (id: string) => void;
  onDelete?: (id: string) => void;
}

function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-copper-100 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-copper-100 bg-cream-100">
            <tr className="text-right text-xs font-semibold text-stone-600">
              <th className="px-5 py-3.5 font-semibold">محصول</th>
              <th className="px-5 py-3.5 font-semibold">دسته‌بندی</th>
              <th className="px-5 py-3.5 font-semibold">قیمت</th>
              <th className="px-5 py-3.5 font-semibold">موجودی</th>
              <th className="px-5 py-3.5 font-semibold">وضعیت</th>
              <th className="px-5 py-3.5 text-center font-semibold">عملیات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-copper-50">
            {products.map((product) => (
              <tr
                key={product.id}
                className="transition-colors hover:bg-cream-100/70"
              >
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className="h-11 w-11 shrink-0 rounded-lg border border-copper-100 object-cover"
                    />
                    <span className="font-medium text-ink">
                      {product.name}
                    </span>
                  </div>
                </td>

                <td className="px-5 py-3">
                  <span className="rounded-md bg-copper-50 px-2.5 py-1 text-xs font-medium text-copper-700">
                    {product.categoryName}
                  </span>
                </td>

                <td className="px-5 py-3 font-medium text-ink">
                  {product.price.toLocaleString()}
                  <span className="mr-1 text-xs font-normal text-stone-400">
                    تومان
                  </span>
                </td>

                <td className="px-5 py-3 text-ink">{product.stock}</td>

                <td className="px-5 py-3">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium ${
                      product.status
                        ? "bg-patina-500/10 text-patina-600"
                        : "bg-stone-400/10 text-stone-600"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        product.status ? "bg-patina-500" : "bg-stone-400"
                      }`}
                    />
                    {product.status ? "فعال" : "غیرفعال"}
                  </span>
                </td>

                <td className="px-5 py-3">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => onEdit(product.id)}
                      aria-label="ویرایش محصول"
                      className="rounded-lg p-2 text-stone-600 transition-colors hover:bg-copper-50 hover:text-copper-700"
                    >
                      <FiEdit2 className="text-base" />
                    </button>

                    <button
                      onClick={() => onDelete?.(product.id)}
                      aria-label="حذف محصول"
                      className="rounded-lg p-2 text-stone-600 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <FiTrash2 className="text-base" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductTable;
