import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { useCategories } from "../../../lib/hooks/useCategories";

interface ProductModalProps {
  initialName: string;
  categoryId: string;
  unit: string;
  price: number;
  stock: number;
  description: string;
  image: string; // مسیر عکس فعلی که از سرور اومده
  status: boolean;

  onClose: () => void;
  onSave: (data: {
    name: string;
    categoryId: string;
    unit: string;
    price: number;
    stock: number;
    description: string;
    image?: File; // فقط اگه عکس جدید انتخاب شد
    status: boolean;
  }) => void;
}

function EditProductModal({
  initialName,
  categoryId,
  unit,
  price,
  stock,
  description,
  image,
  status,
  onClose,
  onSave,
}: ProductModalProps) {
  const { data: categories } = useCategories(1, 100, "");

  const [name, setName] = useState(initialName);
  const [catId, setCatId] = useState(categoryId); // باگ قبلی اینجا رفع شد
  const [unitValue, setUnitValue] = useState(unit);
  const [priceValue, setPriceValue] = useState(price);
  const [stockValue, setStockValue] = useState(stock);
  const [desc, setDesc] = useState(description);
  const [statusValue, setStatusValue] = useState(status);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const inputClass =
    "w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100";

  const labelClass = "text-sm font-semibold text-slate-700";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // آدرس عکس فعلی روی سرور (اگه عکس جدید انتخاب نشده)
  const currentImageUrl = `${import.meta.env.VITE_API_URL}${image}`;

  return (
    <div className="flex h-[80%] max-h-150 w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      {/* Header - ثابت */}
      <div className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-4">
        <h3 className="text-lg font-bold text-slate-800">ویرایش محصول</h3>

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
          {/* Name */}
          <div>
            <label className={labelClass}>نام محصول</label>
            <input
              className={inputClass}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>دسته‌بندی</label>
            <select
              className={inputClass}
              value={catId}
              onChange={(e) => setCatId(e.target.value)}
            >
              <option value="">انتخاب دسته‌بندی</option>
              {categories?.items.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Unit */}
          <div>
            <label className={labelClass}>واحد</label>
            <input
              className={inputClass}
              value={unitValue}
              onChange={(e) => setUnitValue(e.target.value)}
            />
          </div>

          {/* Price */}
          <div>
            <label className={labelClass}>قیمت</label>
            <input
              type="number"
              className={inputClass}
              value={priceValue}
              onChange={(e) => setPriceValue(Number(e.target.value))}
            />
          </div>

          {/* Stock */}
          <div>
            <label className={labelClass}>موجودی</label>
            <input
              type="number"
              className={inputClass}
              value={stockValue}
              onChange={(e) => setStockValue(Number(e.target.value))}
            />
          </div>

          {/* Image */}
          <div>
            <label className={labelClass}>تصویر</label>

            <img
              src={previewUrl ?? currentImageUrl}
              alt="تصویر محصول"
              className="mt-2 mb-3 h-32 w-32 rounded-lg border border-slate-200 object-cover"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className={`${inputClass} cursor-pointer file:ml-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-amber-600 file:px-4 file:py-2 file:text-white file:hover:bg-amber-700`}
            />
            <p className="mt-1 text-xs text-slate-400">
              در صورتی که عکس جدیدی انتخاب نکنید، عکس فعلی حفظ می‌شود.
            </p>
          </div>

          {/* Status */}
          <div>
            <label className={labelClass}>وضعیت</label>
            <select
              className={inputClass}
              value={statusValue ? "true" : "false"}
              onChange={(e) => setStatusValue(e.target.value === "true")}
            >
              <option value="true">فعال</option>
              <option value="false">غیرفعال</option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className={labelClass}>توضیحات</label>
            <textarea
              className={`${inputClass} min-h-28 resize-none`}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
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
              name,
              categoryId: catId,
              unit: unitValue,
              price: Number(priceValue),
              stock: Number(stockValue),
              description: desc,
              image: imageFile ?? undefined, // فقط اگه فایل جدید انتخاب شده بود
              status: statusValue,
            })
          }
          className="rounded-xl bg-amber-600 px-6 py-2.5 font-semibold text-white shadow-md transition hover:bg-amber-700 hover:shadow-lg active:scale-95"
        >
          ذخیره
        </button>
      </div>
    </div>
  );
}

export default EditProductModal;