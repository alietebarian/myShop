import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FiImage, FiUploadCloud } from "react-icons/fi";
import { useCategories } from "../../../lib/hooks/useCategories";
import { getImageUrl } from "../../../lib/hooks/getImageUrl";
import { formatPrice } from "../../../lib/utils/format";
import type { Product } from "../../../lib/types/types";
import Modal from "../../components/ui/Modal";
import Spinner from "../../components/ui/Spinner";

export interface ProductFormValues {
  name: string;
  categoryId: string;
  unit: string;
  price: number;
  stock: number;
  description: string;
  status: boolean;
}

export interface ProductFormResult extends ProductFormValues {
  categoryName: string;
  image?: File;
}

interface ProductFormModalProps {
  open: boolean;
  /** When provided the modal edits this product; otherwise it creates one. */
  product?: Product | null;
  saving?: boolean;
  onClose: () => void;
  onSave: (data: ProductFormResult) => void;
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1.5 text-xs font-medium text-red-600">{message}</p> : null;
}

export default function ProductFormModal({ open, product, saving, onClose, onSave }: ProductFormModalProps) {
  const isEdit = !!product;
  const { data: categories } = useCategories(1, 100, "");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProductFormValues>({
    mode: "onTouched",
    values: {
      name: product?.name ?? "",
      categoryId: product?.categoryId ?? "",
      unit: product?.unit ?? "عدد",
      price: product?.price ?? ("" as unknown as number),
      stock: product?.stock ?? ("" as unknown as number),
      description: product?.description ?? "",
      status: product?.status ?? true,
    },
  });

  useEffect(() => () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  const price = useWatch({ control, name: "price" });
  const description = useWatch({ control, name: "description" }) ?? "";

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setImageError("فقط فایل تصویری (JPG، PNG، WebP) قابل انتخاب است.");
      return;
    }
    setImageError(undefined);
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const submit = (values: ProductFormValues) => {
    if (!isEdit && !imageFile) {
      setImageError("یک تصویر برای محصول انتخاب کنید.");
      return;
    }
    const categoryName = categories?.items.find((c) => c.id.toLowerCase() === values.categoryId.toLowerCase())?.name ?? "";
    onSave({
      ...values,
      name: values.name.trim(),
      unit: values.unit.trim(),
      description: values.description.trim(),
      price: Number(values.price),
      stock: Number(values.stock),
      categoryName,
      image: imageFile ?? undefined,
    });
  };

  const imageSrc = previewUrl ?? (product ? getImageUrl(product.image) : null);
  const errorRing = (has: boolean) => (has ? "border-red-300 focus:border-red-400 focus:ring-red-100" : "");

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title={isEdit ? "ویرایش محصول" : "افزودن محصول جدید"}
      description={isEdit ? product?.name : "اطلاعات محصول را وارد کنید. فیلدهای ستاره‌دار الزامی هستند."}
      footer={
        <>
          <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>
            انصراف
          </button>
          <button type="submit" form="product-form" className="btn btn-primary" disabled={saving}>
            {saving && <Spinner className="h-4 w-4" />}
            {isEdit ? "ذخیره تغییرات" : "افزودن محصول"}
          </button>
        </>
      }
    >
      <form id="product-form" onSubmit={handleSubmit(submit)} noValidate className="grid gap-5 sm:grid-cols-2">
        {/* Image */}
        <div className="sm:col-span-2">
          <span className="field-label">تصویر محصول {!isEdit && <span className="text-red-500">*</span>}</span>
          <label
            className={`group flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed p-3 transition-colors hover:border-copper-300 hover:bg-copper-50/50 ${
              imageError ? "border-red-300" : "border-line"
            }`}
          >
            <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-cream-100 text-2xl text-stone-400">
              {imageSrc ? <img src={imageSrc} alt="پیش‌نمایش تصویر" className="h-full w-full object-cover" /> : <FiImage />}
            </span>
            <span className="text-sm">
              <span className="flex items-center gap-1.5 font-semibold text-copper-700">
                <FiUploadCloud /> {imageSrc ? "تغییر تصویر" : "انتخاب تصویر"}
              </span>
              <span className="mt-1 block text-xs text-stone-500">
                {imageFile ? imageFile.name : isEdit ? "اگر تصویر جدیدی انتخاب نکنید، تصویر فعلی حفظ می‌شود." : "JPG، PNG یا WebP — ترجیحاً مربعی"}
              </span>
            </span>
            <input type="file" accept="image/*" onChange={handleImageChange} className="sr-only" />
          </label>
          <FieldError message={imageError} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="p-name" className="field-label">نام محصول <span className="text-red-500">*</span></label>
          <input
            id="p-name"
            className={`input ${errorRing(!!errors.name)}`}
            placeholder="مثلاً قابلمه مسی چکشی"
            aria-invalid={!!errors.name}
            {...register("name", {
              validate: (v) => v.trim().length > 0 || "نام محصول را وارد کنید",
              maxLength: { value: 150, message: "حداکثر ۱۵۰ کاراکتر" },
            })}
          />
          <FieldError message={errors.name?.message} />
        </div>

        <div>
          <label htmlFor="p-category" className="field-label">دسته‌بندی <span className="text-red-500">*</span></label>
          <select
            id="p-category"
            className={`input ${errorRing(!!errors.categoryId)}`}
            aria-invalid={!!errors.categoryId}
            {...register("categoryId", { required: "یک دسته‌بندی انتخاب کنید" })}
          >
            <option value="">انتخاب کنید…</option>
            {categories?.items.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
                {!c.status ? " (غیرفعال)" : ""}
              </option>
            ))}
          </select>
          <FieldError message={errors.categoryId?.message} />
        </div>

        <div>
          <label htmlFor="p-unit" className="field-label">واحد فروش <span className="text-red-500">*</span></label>
          <input
            id="p-unit"
            className={`input ${errorRing(!!errors.unit)}`}
            placeholder="عدد، دست، سرویس…"
            aria-invalid={!!errors.unit}
            {...register("unit", {
              validate: (v) => v.trim().length > 0 || "واحد فروش را وارد کنید",
              maxLength: { value: 50, message: "حداکثر ۵۰ کاراکتر" },
            })}
          />
          <FieldError message={errors.unit?.message} />
        </div>

        <div>
          <label htmlFor="p-price" className="field-label">قیمت (تومان) <span className="text-red-500">*</span></label>
          <input
            id="p-price"
            type="number"
            inputMode="numeric"
            dir="ltr"
            min={0}
            className={`input text-right ${errorRing(!!errors.price)}`}
            placeholder="0"
            aria-invalid={!!errors.price}
            {...register("price", {
              required: "قیمت را وارد کنید",
              validate: (v) => Number(v) > 0 || "قیمت باید بیشتر از صفر باشد",
            })}
          />
          {errors.price ? (
            <FieldError message={errors.price.message} />
          ) : (
            Number(price) > 0 && <p className="field-hint">{formatPrice(Number(price))}</p>
          )}
        </div>

        <div>
          <label htmlFor="p-stock" className="field-label">موجودی انبار <span className="text-red-500">*</span></label>
          <input
            id="p-stock"
            type="number"
            inputMode="numeric"
            dir="ltr"
            min={0}
            className={`input text-right ${errorRing(!!errors.stock)}`}
            placeholder="0"
            aria-invalid={!!errors.stock}
            {...register("stock", {
              required: "موجودی را وارد کنید",
              validate: (v) => (Number.isInteger(Number(v)) && Number(v) >= 0) || "موجودی باید عدد صحیح و صفر یا بیشتر باشد",
            })}
          />
          <FieldError message={errors.stock?.message} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="p-desc" className="field-label">توضیحات <span className="text-red-500">*</span></label>
          <textarea
            id="p-desc"
            rows={4}
            className={`input resize-y leading-7 ${errorRing(!!errors.description)}`}
            placeholder="جنس، ابعاد، کاربرد و نکات نگهداری…"
            aria-invalid={!!errors.description}
            {...register("description", {
              validate: (v) => v.trim().length > 0 || "توضیحات محصول را وارد کنید",
              maxLength: { value: 1000, message: "حداکثر ۱۰۰۰ کاراکتر" },
            })}
          />
          <div className="flex justify-between">
            <FieldError message={errors.description?.message} />
            <span className={`mt-1.5 mr-auto text-xs ${description.length > 1000 ? "text-red-600" : "text-stone-400"}`}>
              {description.length.toLocaleString("fa-IR")} / ۱۰۰۰
            </span>
          </div>
        </div>

        {isEdit && (
          <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-line p-4 sm:col-span-2">
            <span>
              <span className="block text-sm font-semibold text-ink">نمایش در فروشگاه</span>
              <span className="mt-0.5 block text-xs text-stone-500">محصولات غیرفعال برای مشتریان نمایش داده نمی‌شوند.</span>
            </span>
            <span className="relative inline-flex">
              <input type="checkbox" className="peer sr-only" {...register("status")} />
              <span className="h-6 w-11 rounded-full bg-stone-400/40 transition-colors peer-checked:bg-patina-500 peer-focus-visible:ring-4 peer-focus-visible:ring-copper-100" />
              <span className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:-translate-x-5" />
            </span>
          </label>
        )}
      </form>
    </Modal>
  );
}
