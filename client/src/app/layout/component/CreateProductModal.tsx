import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useCategories } from "../../../lib/hooks/useCategories";

interface CreateProductModalProps {
  onClose: () => void;
  onSave: (data: {
    image: File;
    name: string;
    categoryName: string;
    unit: string;
    price: number;
    stock: number;
    description: string;
  }) => void;
}

function CreateProductModal({ onClose, onSave }: CreateProductModalProps) {
  const { data: categories } = useCategories(1, 100, "");

  const [name, setName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const inputClass =
    "w-full rounded-xl border border-copper-100 bg-white px-4 py-3 text-ink outline-none transition focus:border-copper-400 focus:ring-4 focus:ring-copper-100";

  const labelClass = "mb-2 block text-sm font-semibold text-ink";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      // پاک کردن URL قبلی برای جلوگیری از leak حافظه
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    if (!imageFile) return;

    onSave({
      image: imageFile,
      name,
      categoryName,
      unit,
      price: Number(price),
      stock: Number(stock),
      description,
    });
  };

  return (
    <div className="flex h-[80%] max-h-150 w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-copper-100 bg-white shadow-2xl">
      {/* Header - ثابت */}
      <div className="flex shrink-0 items-center justify-between border-b border-copper-100 bg-cream-100 px-6 py-4">
        <h3 className="text-lg font-bold text-ink">افزودن محصول جدید</h3>

        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 transition hover:bg-cream-200 hover:text-red-500"
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

              {categories?.items?.map((category) => (
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
            <label className={labelClass}>تصویر محصول</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`${inputClass} cursor-pointer file:ml-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-copper-600 file:px-4 file:py-2 file:text-white file:hover:bg-copper-700`}
            />

            {previewUrl && (
              <img
                src={previewUrl}
                alt="پیش‌نمایش"
                className="mt-3 h-32 w-32 rounded-lg object-cover border border-copper-100"
              />
            )}
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
      <div className="flex shrink-0 justify-end gap-3 border-t border-copper-100 bg-cream-100 px-6 py-4">
        <button
          onClick={onClose}
          className="rounded-xl border border-copper-100 px-6 py-2.5 font-medium text-ink-700 transition hover:bg-cream-100"
        >
          انصراف
        </button>

        <button
          onClick={handleSave}
          className="rounded-xl bg-copper-600 px-6 py-2.5 font-semibold text-white shadow-md transition hover:bg-copper-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-copper-100"
          disabled={
            !name.trim() ||
            !categoryName ||
            !unit.trim() ||
            !imageFile ||
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