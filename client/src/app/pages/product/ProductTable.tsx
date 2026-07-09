import type { Product } from "../../../lib/types/types";

interface ProductTableProps {
  products: Product[];
  // onAdd: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete?: (id: string) => void;
}

function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <div className="overflow-hidden bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-orange-50">
            <tr className="text-center text-sm font-bold text-slate-700">
              <th className="px-6 py-4">تصویر</th>
              <th className="px-6 py-4">نام محصول</th>
              <th className="px-6 py-4">دسته‌بندی</th>
              <th className="px-6 py-4">قیمت</th>
              <th className="px-6 py-4">موجودی</th>
              <th className="px-6 py-4">وضعیت</th>
              <th className="px-6 py-4">عملیات</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className="border-b border-slate-100 text-center transition hover:bg-orange-50/40"
              >
                <td className="px-6 py-4">
                  <img
                    src={product.image}
                    className="mx-auto h-16 w-16 rounded-xl object-cover"
                  />
                </td>

                <td className="px-6 py-4 font-semibold">{product.name}</td>

                <td className="px-6 py-4">
                  <span className="rounded-lg bg-orange-100 px-3 py-1 text-sm text-orange-700">
                    {product.categoryName}
                  </span>
                </td>

                <td className="px-6 py-4 font-bold">
                  {product.price.toLocaleString()}
                </td>

                <td className="px-6 py-4">{product.stock}</td>

                <td className="px-6 py-4">
                  {product.status ? "فعال" : "غیرفعال"}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(product.id)}
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-100"
                    >
                      ✏️
                    </button>

                    <button
                      onClick={() => onDelete?.(product.id)}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-100"
                    >
                      🗑️
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
