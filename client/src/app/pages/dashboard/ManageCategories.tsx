import DashboardHeader from "./DashboardHeader";
import CategoryCart from "../../layout/component/CategoryCart";
import CategoryModal from "../../layout/component/CategoryModal";
import { useState } from "react";
import { toast } from "sonner";
import { IoIosSearch } from "react-icons/io";
import {
  useCreateCategory,
  useUpdateCategory,
  useCategories,
} from "../../../lib/hooks/useCategories";
import type { Category } from "../../../lib/types/types";
import { getErrorMessage } from "../../../lib/hooks/getErrorMessage";

type ModalMode = "create" | "edit";

function ManageCategories() {
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState<ModalMode>("create");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");

  const pageSize = 9;

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
    updateCategory.mutate(
      {
        id: category.id,
        data: {
          name: category.name,
          status: !category.status,
        },
      },
      {
        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      },
    );
  };

  return (
    <>
      {/* MODAL */}
      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-sm">
          <CategoryModal
            title={mode === "create" ? "افزودن" : "ویرایش"}
            initialName={selectedCategory?.name ?? ""}
            onClose={() => setOpenModal(false)}
            onSave={(name) => {
              if (mode === "create") {
                createCategory.mutate(
                  { name },
                  {
                    onSuccess: () => {
                      toast.success("دسته‌بندی با موفقیت اضافه شد");
                      setOpenModal(false);
                    },
                    onError: (error) => {
                      toast.error(getErrorMessage(error));
                    },
                  },
                );
              } else if (selectedCategory) {
                updateCategory.mutate(
                  {
                    id: selectedCategory.id,
                    data: { name },
                  },
                  {
                    onSuccess: () => {
                      toast.success("دسته‌بندی با موفقیت ویرایش شد");
                      setOpenModal(false);
                    },
                    onError: (error) => {
                      toast.error(getErrorMessage(error));
                    },
                  },
                );
              }
            }}
          />
        </div>
      )}

      <div>
        {/* HEADER */}
        <DashboardHeader
          onAdd={addCategory}
          buttonText="افزودن دسته‌بندی"
          headerCount={data?.totalCount ?? 0}
          headerName="مدیریت دسته‌بندی"
        />

        {/* SEARCH */}
        <div className="relative mb-6 max-w-sm">
          <IoIosSearch className="absolute right-3.5 top-1/2 -translate-y-1/2 text-lg text-stone-400" />
          <input
            type="text"
            placeholder="جستجوی دسته‌بندی..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPageNumber(1);
            }}
            className="w-full rounded-lg border border-copper-100 bg-cream-100 py-2.5 pr-10 pl-4 text-sm outline-none transition focus:border-copper-400 focus:bg-white focus:ring-4 focus:ring-copper-100"
          />
        </div>

        {/* LOADING / EMPTY / GRID */}
        {isLoading ? (
          <div className="rounded-xl border border-copper-100 bg-white py-20 text-center text-sm text-stone-600">
            در حال بارگذاری...
          </div>
        ) : data?.items.length === 0 ? (
          <div className="rounded-xl border border-copper-100 bg-white py-20 text-center text-sm text-stone-600">
            دسته‌بندی‌ای یافت نشد
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
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

        {/* PAGINATION INFO */}
        {!isLoading && data?.items.length ? (
          <div className="mt-4 text-center text-sm text-stone-600">
            نمایش{" "}
            <span className="font-bold text-copper-600">
              {data?.items.length}
            </span>{" "}
            از{" "}
            <span className="font-bold text-copper-600">
              {data?.totalCount}
            </span>{" "}
            دسته‌بندی
          </div>
        ) : null}

        {/* PAGINATION */}
        {!isLoading && totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2 pb-10">
            {/* Prev */}
            <button
              disabled={pageNumber === 1}
              onClick={() => setPageNumber((p) => p - 1)}
              className="rounded-lg border border-copper-100 bg-white px-3.5 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-copper-300 hover:text-copper-600 disabled:cursor-not-allowed disabled:opacity-40"
            >
              ← قبلی
            </button>

            {/* Pages */}
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPageNumber(i + 1)}
                className={`h-9 w-9 rounded-lg text-sm font-semibold transition-colors ${pageNumber === i + 1
                    ? "bg-copper-600 text-cream"
                    : "border border-copper-100 bg-white text-ink-700 hover:border-copper-300 hover:text-copper-600"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            {/* Next */}
            <button
              disabled={pageNumber === totalPages}
              onClick={() => setPageNumber((p) => p + 1)}
              className="rounded-lg border border-copper-100 bg-white px-3.5 py-2 text-sm font-medium text-ink-700 transition-colors hover:border-copper-300 hover:text-copper-600 disabled:cursor-not-allowed disabled:opacity-40"
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
