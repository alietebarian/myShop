import { useForm } from "react-hook-form";
import Modal from "../../components/ui/Modal";
import Spinner from "../../components/ui/Spinner";

interface CategoryModalProps {
  open: boolean;
  mode: "create" | "edit";
  initialName: string;
  saving?: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
}

function CategoryModal({ open, mode, initialName, saving, onClose, onSave }: CategoryModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({ mode: "onTouched", values: { name: initialName } });

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="sm"
      title={mode === "create" ? "افزودن دسته‌بندی" : "ویرایش دسته‌بندی"}
      footer={
        <>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>
            انصراف
          </button>
          <button type="submit" form="category-form" className="btn btn-primary" disabled={saving}>
            {saving && <Spinner className="h-4 w-4" />}
            {mode === "create" ? "افزودن دسته‌بندی" : "ذخیره تغییرات"}
          </button>
        </>
      }
    >
      <form id="category-form" noValidate onSubmit={handleSubmit(({ name }) => onSave(name.trim()))}>
        <label htmlFor="cat-name" className="field-label">
          نام دسته‌بندی
        </label>
        <input
          id="cat-name"
          className={`input ${errors.name ? "border-red-300 focus:border-red-400 focus:ring-red-100" : ""}`}
          placeholder="مثلاً ظروف پذیرایی"
          aria-invalid={!!errors.name}
          {...register("name", {
            validate: (v) => v.trim().length > 0 || "نام دسته‌بندی را وارد کنید",
            maxLength: { value: 100, message: "حداکثر ۱۰۰ کاراکتر" },
          })}
        />
        {errors.name ? (
          <p className="mt-1.5 text-xs font-medium text-red-600">{errors.name.message}</p>
        ) : (
          <p className="field-hint">این نام در منوی فروشگاه به مشتریان نمایش داده می‌شود.</p>
        )}
      </form>
    </Modal>
  );
}

export default CategoryModal;
