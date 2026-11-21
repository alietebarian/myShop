import { useState } from "react";
import { toast } from "sonner";
import { FiFolder, FiSearch } from "react-icons/fi";
import DashboardHeader from "./DashboardHeader";
import CategoryCard from "../../layout/component/CategoryCart";
import CategoryModal from "../../layout/component/CategoryModal";
import Pagination from "../../components/ui/Pagination";
import EmptyState from "../../components/ui/EmptyState";
import { useCreateCategory, useUpdateCategory, useCategories } from "../../../lib/hooks/useCategories";
import { useDebouncedValue } from "../../../lib/hooks/useDebouncedValue";
import { getErrorMessage } from "../../../lib/hooks/getErrorMessage";
import type { Category } from "../../../lib/types/types";

const PAGE_SIZE = 9;

type ModalState = { mode: "create" } | { mode: "edit"; category: Category } | null;

function ManageCategories() {
  const [modal, setModal] = useState<ModalState>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search.trim(), 350);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const { data, isLoading, isFetching } = useCategories(pageNumber, PAGE_SIZE, debouncedSearch);
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const toggleStatus = (category: Category) => {
    setTogglingId(category.id);
    updateCategory.mutate(
      { id: category.id, data: { name: category.name, status: !category.status } },
      {
        onSuccess: () => toast.success(`«${category.name}» ${category.status ? "غیرفعال" : "فعال"} شد`),
        onError: (e) => toast.error(getErrorMessage(e)),
        onSettled: () => setTogglingId(null),
      },
    );
  };

  const handleSave = (name: string) => {
    if (modal?.mode === "edit") {
      updateCategory.mutate(
        { id: modal.category.id, data: { name, status: modal.category.status } },
        {
          onSuccess: () => {
            toast.success("دسته‌بندی ویرایش شد");
            setModal(null);
          },
          onError: (e) => toast.error(getErrorMessage(e)),
        },
      );
    } else {
      createCategory.mutate(
        { name },
        {
          onSuccess: () => {
            toast.success("دسته‌بندی جدید اضافه شد");
            setModal(null);
          },
          onError: (e) => toast.error(getErrorMessage(e)),
        },
      );
    }
  };

  const items = data?.items ?? [];

  return (
    <div>
      <DashboardHeader
        headerName="دسته‌بندی‌ها"
        headerCount={data?.totalCount ?? 0}
        description="دسته‌بندی‌های فعال در منوی فروشگاه نمایش داده می‌شوند"
        buttonText="افزودن دسته‌بندی"
        onAdd={() => setModal({ mode: "create" })}
      />

      <div className="relative mb-5 max-w-sm">
        <label htmlFor="cat-search" className="sr-only">جستجوی دسته‌بندی</label>
        <FiSearch className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-stone-400" />
        <input
          id="cat-search"
          type="search"
          placeholder="جستجوی دسته‌بندی…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPageNumber(1);
          }}
          className="input h-10 py-0 pr-10"
        />
      </div>

      <div className={`transition-opacity ${isFetching && !isLoading ? "opacity-60" : ""}`}>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" aria-busy>
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="skeleton h-36 rounded-2xl" />
            ))}
          </div>
        ) : items.length === 0 ? (
          debouncedSearch ? (
            <EmptyState
              icon={<FiSearch />}
              title={`دسته‌بندی‌ای با نام «${debouncedSearch}» پیدا نشد`}
              action={<button type="button" className="btn btn-secondary" onClick={() => setSearch("")}>پاک کردن جستجو</button>}
            />
          ) : (
            <EmptyState
              icon={<FiFolder />}
              title="هنوز دسته‌بندی‌ای نساخته‌اید"
              description="برای نظم‌دادن به محصولات، اولین دسته‌بندی را بسازید."
              action={<button type="button" className="btn btn-primary" onClick={() => setModal({ mode: "create" })}>افزودن اولین دسته‌بندی</button>}
            />
          )
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {items.map((category) => (
              <CategoryCard
                key={category.id}
                catName={category.name}
                catCount={category.productCount ?? 0}
                status={category.status}
                busy={togglingId === category.id}
                onEdit={() => setModal({ mode: "edit", category })}
                onToggleStatus={() => toggleStatus(category)}
              />
            ))}
          </div>
        )}
      </div>

      {data && (
        <div className="mt-6">
          <Pagination page={pageNumber} totalPages={data.totalPages} onChange={setPageNumber} />
        </div>
      )}

      {modal && (
        <CategoryModal
          open
          mode={modal.mode}
          initialName={modal.mode === "edit" ? modal.category.name : ""}
          saving={createCategory.isPending || (updateCategory.isPending && !togglingId)}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default ManageCategories;
