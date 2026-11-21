import { useState } from "react";
import { toast } from "sonner";
import { FiBox, FiAlertTriangle, FiEyeOff, FiSearch } from "react-icons/fi";
import { PiPackage } from "react-icons/pi";
import DashboardHeader from "../dashboard/DashboardHeader";
import ProductTitle from "./ProductTitle";
import ProductTable from "./ProductTable";
import ProductFormModal, { type ProductFormResult } from "../../layout/component/ProductFormModal";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Pagination from "../../components/ui/Pagination";
import EmptyState from "../../components/ui/EmptyState";
import { useCreateProduct, useDeleteProduct, useProducts, useUpdateProduct } from "../../../lib/hooks/useProducts";
import { useCategories } from "../../../lib/hooks/useCategories";
import { useDebouncedValue } from "../../../lib/hooks/useDebouncedValue";
import { getErrorMessage } from "../../../lib/hooks/getErrorMessage";
import type { Product } from "../../../lib/types/types";

const PAGE_SIZE = 10;

type FormState = { mode: "create" } | { mode: "edit"; product: Product } | null;

function ManageProducts() {
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search.trim(), 350);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [form, setForm] = useState<FormState>(null);
  const [toDelete, setToDelete] = useState<Product | null>(null);

  const { data: products, isLoading, isFetching } = useProducts(pageNumber, PAGE_SIZE, debouncedSearch);
  const { data: categories } = useCategories(1, 100, "");
  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();
  const createProduct = useCreateProduct();

  const pageItems = products?.items ?? [];
  const visible = pageItems.filter(
    (p) =>
      (!selectedCategory || p.categoryId.toLowerCase() === selectedCategory.toLowerCase()) &&
      (!selectedStatus || String(p.status) === selectedStatus),
  );
  const hasFilters = !!(debouncedSearch || selectedCategory || selectedStatus);

  const handleSave = (data: ProductFormResult) => {
    if (form?.mode === "edit") {
      updateProduct.mutate(
        {
          id: form.product.id,
          data: {
            name: data.name,
            categoryId: data.categoryId,
            unit: data.unit,
            price: data.price,
            stock: data.stock,
            description: data.description,
            status: data.status,
            image: data.image,
          },
        },
        {
          onSuccess: () => {
            toast.success("تغییرات محصول ذخیره شد");
            setForm(null);
          },
          onError: (e) => toast.error(getErrorMessage(e)),
        },
      );
    } else {
      if (!data.image) return;
      createProduct.mutate(
        {
          image: data.image,
          name: data.name,
          categoryName: data.categoryName,
          unit: data.unit,
          price: data.price,
          stock: data.stock,
          description: data.description,
        },
        {
          onSuccess: () => {
            toast.success("محصول جدید اضافه شد");
            setForm(null);
          },
          onError: (e) => toast.error(getErrorMessage(e)),
        },
      );
    }
  };

  const handleDelete = () => {
    if (!toDelete) return;
    deleteProduct.mutate(toDelete.id, {
      onSuccess: () => {
        toast.success(`«${toDelete.name}» حذف شد`);
        setToDelete(null);
      },
      onError: (e) => toast.error(getErrorMessage(e)),
    });
  };

  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedStatus("");
    setPageNumber(1);
  };

  return (
    <div>
      <DashboardHeader
        headerName="محصولات"
        headerCount={products?.totalCount ?? 0}
        description="افزودن، ویرایش و مدیریت موجودی محصولات فروشگاه"
        buttonText="افزودن محصول"
        onAdd={() => setForm({ mode: "create" })}
      />

      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <ProductTitle icon={<FiBox />} title="کل محصولات" count={products?.totalCount ?? 0} />
        <ProductTitle
          icon={<FiAlertTriangle />}
          tone="red"
          title="ناموجود یا رو به اتمام"
          count={pageItems.filter((p) => p.stock <= 3).length}
          caption="در صفحه فعلی"
        />
        <ProductTitle
          icon={<FiEyeOff />}
          tone="stone"
          title="غیرفعال"
          count={pageItems.filter((p) => !p.status).length}
          caption="در صفحه فعلی"
        />
      </div>

      {/* Filters */}
      <div className="card mb-4 flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <label htmlFor="admin-product-search" className="sr-only">جستجوی محصول</label>
          <FiSearch className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-stone-400" />
          <input
            id="admin-product-search"
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPageNumber(1);
            }}
            placeholder="جستجو بر اساس نام محصول…"
            className="input h-10 py-0 pr-10"
          />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:flex">
          <label className="sr-only" htmlFor="admin-cat-filter">دسته‌بندی</label>
          <select
            id="admin-cat-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input h-10 py-0 sm:w-44"
          >
            <option value="">همه دسته‌ها</option>
            {categories?.items.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <label className="sr-only" htmlFor="admin-status-filter">وضعیت</label>
          <select
            id="admin-status-filter"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="input h-10 py-0 sm:w-36"
          >
            <option value="">همه وضعیت‌ها</option>
            <option value="true">فعال</option>
            <option value="false">غیرفعال</option>
          </select>
        </div>
      </div>

      <div className={`transition-opacity ${isFetching && !isLoading ? "opacity-60" : ""}`}>
        {isLoading ? (
          <div className="card divide-y divide-line" aria-busy>
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex items-center gap-3 p-4">
                <div className="skeleton h-11 w-11" />
                <div className="skeleton h-4 flex-1" />
                <div className="skeleton hidden h-4 w-24 md:block" />
                <div className="skeleton hidden h-4 w-16 md:block" />
              </div>
            ))}
          </div>
        ) : visible.length === 0 ? (
          hasFilters ? (
            <EmptyState
              icon={<FiSearch />}
              title="محصولی با این فیلترها پیدا نشد"
              description="عبارت جستجو یا فیلترها را تغییر دهید."
              action={<button type="button" className="btn btn-secondary" onClick={resetFilters}>حذف همه فیلترها</button>}
            />
          ) : (
            <EmptyState
              icon={<PiPackage />}
              title="هنوز محصولی اضافه نکرده‌اید"
              description="اولین محصول فروشگاه را اضافه کنید تا در صفحه فروشگاه نمایش داده شود."
              action={<button type="button" className="btn btn-primary" onClick={() => setForm({ mode: "create" })}>افزودن اولین محصول</button>}
            />
          )
        ) : (
          <ProductTable
            products={visible}
            onEdit={(product) => setForm({ mode: "edit", product })}
            onDelete={setToDelete}
          />
        )}
      </div>

      {products && (
        <div className="mt-6">
          <Pagination page={pageNumber} totalPages={products.totalPages} onChange={setPageNumber} />
        </div>
      )}

      {form && (
        <ProductFormModal
          open
          product={form.mode === "edit" ? form.product : null}
          saving={createProduct.isPending || updateProduct.isPending}
          onClose={() => setForm(null)}
          onSave={handleSave}
        />
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="حذف محصول"
        message={`«${toDelete?.name ?? ""}» برای همیشه حذف می‌شود و دیگر در فروشگاه نمایش داده نمی‌شود. این کار قابل بازگشت نیست.`}
        confirmText="حذف محصول"
        loading={deleteProduct.isPending}
        onClose={() => setToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default ManageProducts;
