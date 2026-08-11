import { useState } from "react";
import { IoIosClose } from "react-icons/io";

interface CategoryModalProps {
  title: string;
  initialName: string;
  onClose: () => void;
  onSave: (name: string) => void;
}

function CategoryModal({ title, initialName, onClose, onSave }: CategoryModalProps) {
  const [name, setName] = useState(initialName);

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-copper-100 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-copper-100 px-6 py-4">
        <h3 className="text-xl font-bold text-ink">{`${title} دسته بندی`}</h3>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full text-stone-600 transition hover:bg-cream-100 hover:text-red-500"
        >
          <IoIosClose className="text-3xl" />
        </button>
      </div>

      {/* Body */}
      <div className="space-y-5 p-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-ink">
            نام دسته‌بندی
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثلاً ظروف مسی"
            className="w-full rounded-xl border border-copper-100 px-4 py-3 text-ink outline-none transition-all duration-200 placeholder:text-stone-400 focus:border-copper-400 focus:ring-4 focus:ring-copper-100"
          />

          <span className="text-xs text-stone-400">
            نامی وارد کنید که برای کاربران نمایش داده می‌شود.
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t border-copper-100 px-6 py-4">
        <button
          onClick={onClose}
          className="rounded-xl border border-copper-100 px-6 py-2.5 font-medium text-stone-600 transition hover:bg-cream-100"
        >
          انصراف
        </button>

        <button
          onClick={() => onSave(name)}
          className="rounded-xl bg-copper-600 px-6 py-2.5 font-semibold text-white shadow-md transition-all duration-200 hover:bg-copper-700 active:scale-[0.98]"
        >
          ذخیره
        </button>
      </div>
    </div>
  );
}

export default CategoryModal;
