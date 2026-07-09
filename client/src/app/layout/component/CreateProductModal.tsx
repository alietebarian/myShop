import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useCategories } from "../../../lib/hooks/useCategories";

interface CreateProductModalProps {
  onClose: () => void;
  onSave: (data: {
    image: string;
    name: string;
    categoryName: string;
    unit: string;
    price: number;
    stock: number;
    description: string;
  }) => void;
}

function CreateProductModal({ onClose, onSave }: CreateProductModalProps) {
  const { data: categories } = useCategories();

  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <div className="flex h-[80%] max-h-150 w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      {/* Header - ثابت */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
        <h3 className="text-lg font-bold text-slate-800">افزودن محصول جدید</h3>

        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-200 hover:text-red-500"
        >
          <IoIosClose className="text-3xl" />
        </button>
      </div>

      {/* Body - قابل اسکرول */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <div className="space-y-5">
          {/* Product Name */}
          <div>
            <label className={labelClass}>نام محصول</label>
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثلاً قابلمه مسی"
            />
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>دسته‌بندی</label>

            <select
              className={inputClass}
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            >
              <option value="">انتخاب دسته‌بندی</option>

              {categories?.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Unit */}
          <div>
            <label className={labelClass}>واحد</label>

            <input
              className={inputClass}
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="عدد، کیلوگرم، متر..."
            />
          </div>

          {/* Price */}
          <div>
            <label className={labelClass}>قیمت (تومان)</label>

            <input
              type="number"
              className={inputClass}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </div>

          {/* Stock */}
          <div>
            <label className={labelClass}>موجودی</label>

            <input
              type="number"
              className={inputClass}
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
            />
          </div>

          {/* Image */}
          <div>
            <label className={labelClass}>آدرس تصویر</label>

            <input
              className={inputClass}
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="products/copper-pot.jpg"
            />
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>توضیحات</label>

            <textarea
              className={`${inputClass} min-h-28 resize-none`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="توضیحات محصول..."
            />
          </div>
        </div>
      </div>

      {/* Footer - ثابت */}
      <div className="flex shrink-0 justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
        <button
          onClick={onClose}
          className="rounded-xl border border-slate-300 px-6 py-2.5 font-medium text-slate-600 transition hover:bg-slate-100"
        >
          انصراف
        </button>

        <button
          onClick={() =>
            onSave({
              image,
              name,
              categoryName,
              unit,
              price: Number(price),
              stock: Number(stock),
              description,
            })
          }
          className="rounded-xl bg-amber-600 px-6 py-2.5 font-semibold text-white shadow-md transition hover:bg-amber-700 hover:shadow-lg active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-300"
          disabled={
            !name.trim() ||
            !categoryName ||
            !unit.trim() ||
            price <= 0 ||
            stock < 0
          }
        >
          افزودن محصول
        </button>
      </div>
    </div>
  );
}

export default CreateProductModal;
