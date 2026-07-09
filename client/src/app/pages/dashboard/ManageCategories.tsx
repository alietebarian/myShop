import DashboardHeader from "./DashboardHeader";
import CategoryCart from "../../layout/component/CategoryCart";
import CategoryModal from "../../layout/component/CategoryModal";
import { useState } from "react";
import {
  useCreateCategory,
  useUpdateCategory,
  useCategories,
} from "../../../lib/hooks/useCategories";
import type { Category } from "../../../lib/types/types";

type ModalMode = "create" | "edit";

function ManageCategories() {
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<ModalMode>("create");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");

  const pageSize = 7;

  const { data, isLoading } = useCategories(pageNumber, pageSize, search);
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();

  const totalPages = data?.totalPages ?? 1;

  const editCategory = (category: Category) => {
    setMode("edit");
    setSelectedCategory(category);
    setOpenModal(true);
  };

  const addCategory = () => {
    setMode("create");
    setSelectedCategory(null);
    setOpenModal(true);
  };

  const toggleCategoryStatus = (category: Category) => {
    updateCategory.mutate({
      id: category.id,
      data: {
        name: category.name,
        status: !category.status,
      },
    });
  };

  return (
    <>
      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <CategoryModal
            title={mode === "create" ? "افزودن" : "ویرایش"}
            initialName={selectedCategory?.name ?? ""}
            onClose={() => setOpenModal(false)}
            onSave={(name) => {
              if (mode === "create") {
                createCategory.mutate(
                  { name },
                  {
                    onSuccess: () => setOpenModal(false),
                  },
                );
              } else if (selectedCategory) {
                updateCategory.mutate(
                  {
                    id: selectedCategory.id,
                    data: { name },
                  },
                  {
                    onSuccess: () => setOpenModal(false),
                  },
                );
              }
            }}
          />
        </div>
      )}

      <div className="space-y-8">
        {/* HEADER */}
        <DashboardHeader
          onAdd={addCategory}
          buttonText="افزودن دسته‌بندی"
          headerCount={data?.totalCount ?? 0}
          headerName="مدیریت دسته‌بندی"
        />

        {/* SEARCH */}
        <div className="px-6">
          <input
            type="text"
            placeholder="جستجوی دسته‌بندی..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPageNumber(1);
            }}
            className="w-full rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm outline-none transition-all duration-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          />
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="py-20 text-center text-gray-500">
            در حال بارگذاری...
          </div>
        )}

        {/* GRID */}
        {!isLoading && (
          <div className="grid grid-cols-1 gap-6 px-6 md:grid-cols-2 xl:grid-cols-3">
            {data?.items.map((category) => (
              <CategoryCart
                key={category.id}
                catName={category.name}
                catCount={category.productCount ?? 0}
                status={category.status}
                onEdit={() => editCategory(category)}
                onToggleStatus={() => toggleCategoryStatus(category)}
              />
            ))}
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && data?.items.length === 0 && (
          <div className="py-16 text-center text-gray-500">
            دسته‌بندی‌ای یافت نشد
          </div>
        )}

        {/* PAGINATION INFO */}
        {!isLoading && data?.items.length ? (
          <div className="text-center text-sm text-gray-500">
            نمایش{" "}
            <span className="font-bold text-orange-600">
              {data?.items.length}
            </span>{" "}
            از{" "}
            <span className="font-bold text-orange-600">
              {data?.totalCount}
            </span>{" "}
            دسته‌بندی
          </div>
        ) : null}

        {/* PAGINATION */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2 pb-10">
            {/* Prev */}
            <button
              disabled={pageNumber === 1}
              onClick={() => setPageNumber((p) => p - 1)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all hover:border-orange-400 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← قبلی
            </button>

            {/* Pages */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPageNumber(i + 1)}
                className={`h-10 w-10 rounded-xl font-semibold transition-all ${
                  pageNumber === i + 1
                    ? "bg-orange-500 text-white shadow-lg"
                    : "border border-gray-200 bg-white hover:border-orange-400 hover:text-orange-600"
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              disabled={pageNumber === totalPages}
              onClick={() => setPageNumber((p) => p + 1)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-all hover:border-orange-400 hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              بعدی →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ManageCategories;
