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
    <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
        <h3 className="text-xl font-bold text-slate-800">{`${title} دسته بندی`}</h3>
        <button
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-red-500"
        >
          <IoIosClose className="text-3xl" />
        </button>
      </div>

      {/* Body */}
      <div className="space-y-5 p-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">
            نام دسته‌بندی
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثلاً ظروف مسی"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-700 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
          />

          <span className="text-xs text-slate-400">
            نامی وارد کنید که برای کاربران نمایش داده می‌شود.
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
        <button
          onClick={onClose}
          className="rounded-xl border border-slate-300 px-6 py-2.5 font-medium text-slate-600 transition hover:bg-slate-100"
        >
          انصراف
        </button>

        <button
          onClick={() => onSave(name)}
          className="rounded-xl bg-amber-600 px-6 py-2.5 font-semibold text-white shadow-md transition-all duration-200 hover:bg-amber-700 hover:shadow-lg active:scale-95"
        >
          ذخیره
        </button>
      </div>
    </div>
  );
}

export default CategoryModal;
