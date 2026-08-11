import DashboardHeader from "../dashboard/DashboardHeader";
import ProductTitle from "./ProductTitle";
import { AiOutlineProduct } from "react-icons/ai";
import { PiCoinsLight } from "react-icons/pi";
import { MdOutlineDetails } from "react-icons/md";
import ProductTable from "./ProductTable";

import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "../../../lib/hooks/useProducts";

import { useState } from "react";
import ProductModal from "../../layout/component/EditProductModal";
import CreateProductModal from "../../layout/component/CreateProductModal";

import type { CreateProduct, Product } from "../../../lib/types/types";
import { IoIosSearch } from "react-icons/io";
import { useCategories } from "../../../lib/hooks/useCategories";
import { toast } from "sonner";
import { getErrorMessage } from "../../../lib/hooks/getErrorMessage";

function ManageProducts() {
  /* ---------------- pagination + filters ---------------- */
  const [pageNumber, setPageNumber] = useState(1);
  const pageSize = 6;

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  /* ---------------- modals ---------------- */
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  /* ---------------- API ---------------- */
  const { data: products, isLoading } = useProducts(
    pageNumber,
    pageSize,
    search,
  );

  const { data: categories } = useCategories(1, 100, "");

  const deleteProduct = useDeleteProduct();
  const updateProduct = useUpdateProduct();
  const createProduct = useCreateProduct();

  const totalPages = products?.totalPages ?? 1;

  /* ---------------- handlers ---------------- */
  const handleEdit = (id: string) => {
    const product = products?.items.find((p) => p.id === id);
    if (!product) return;
    setSelectedProduct(product);
  };

  const handleSave = (data: any) => {
    if (!selectedProduct) return;

    updateProduct.mutate(
      { id: selectedProduct.id, data },
      {
        onSuccess: () => {
          toast.success("محصول با موفقیت ویرایش شد");
          setSelectedProduct(null);
        },
        onError: (error) => {
          toast.error(getErrorMessage(error));
        },
      },
    );
  };

  const handleCreate = (data: CreateProduct) => {
    createProduct.mutate(data, {
      onSuccess: () => {
        toast.success("محصول با موفقیت اضافه شد");
        setIsCreateModalOpen(false);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
      },
    });
  };

  /* ---------------- UI ---------------- */
  return (
    <div>
      {/* HEADER */}
      <DashboardHeader
        buttonText="افزودن محصول"
        headerCount={products?.totalCount ?? 0}
        headerName="مدیریت محصولات"
        onAdd={() => setIsCreateModalOpen(true)}
      />

      {/* STATS */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <ProductTitle
          count={products?.totalCount ?? 0}
          icon={<AiOutlineProduct />}
          title="کل محصولات"
        />

        <ProductTitle
          count={
            products?.items.reduce((a, b) => a + b.price * b.stock, 0) ?? 0
          }
          icon={<PiCoinsLight />}
          title="ارزش انبار (تومان)"
        />

        <ProductTitle
          count={products?.items.filter((p) => !p.status).length ?? 0}
          icon={<MdOutlineDetails />}
          title="محصولات غیرفعال"
        />
      </div>

      {/* FILTER BAR */}
      <div className="mb-4 flex flex-col gap-3 rounded-xl border border-copper-100 bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
        {/* SEARCH */}
        <div className="relative w-full lg:max-w-sm">
          <IoIosSearch className="absolute right-3.5 top-1/2 -translate-y-1/2 text-lg text-stone-400" />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPageNumber(1);
            }}
            placeholder="جستجوی محصول..."
            className="w-full rounded-lg border border-copper-100 bg-cream-100 py-2.5 pr-10 pl-4 text-sm outline-none transition focus:border-copper-400 focus:bg-white focus:ring-4 focus:ring-copper-100"
          />
        </div>

        {/* FILTERS */}
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPageNumber(1);
            }}
            className="min-w-44 rounded-lg border border-copper-100 bg-white px-3.5 py-2.5 text-sm text-ink-700"
          >
            <option value="">همه دسته‌بندی‌ها</option>

            {categories?.items.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              setPageNumber(1);
            }}
            className="min-w-36 rounded-lg border border-copper-100 bg-white px-3.5 py-2.5 text-sm text-ink-700"
          >
            <option value="">همه وضعیت‌ها</option>
            <option value="true">فعال</option>
            <option value="false">غیرفعال</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      {isLoading ? (
        <div className="rounded-xl border border-copper-100 bg-white py-20 text-center text-sm text-stone-600">
          در حال بارگذاری...
        </div>
      ) : products?.items.length === 0 ? (
        <div className="rounded-xl border border-copper-100 bg-white py-20 text-center text-sm text-stone-600">
          محصولی یافت نشد
        </div>
      ) : (
        <ProductTable
          products={products?.items ?? []}
          onDelete={(id) => deleteProduct.mutate(id)}
          onEdit={handleEdit}
        />
      )}

      {/* PAGINATION INFO */}
      {!isLoading && products?.items.length ? (
        <div className="mt-4 text-center text-sm text-stone-600">
          نمایش{" "}
          <span className="font-bold text-copper-600">
            {products?.items.length}
          </span>{" "}
          از{" "}
          <span className="font-bold text-copper-600">
            {products?.totalCount}
          </span>{" "}
          محصول
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

      {/* CREATE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
          <CreateProductModal
            onClose={() => setIsCreateModalOpen(false)}
            onSave={handleCreate}
          />
        </div>
      )}

      {/* EDIT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
          <ProductModal
            initialName={selectedProduct.name}
            categoryId={selectedProduct.categoryId}
            unit={selectedProduct.unit}
            price={selectedProduct.price}
            stock={selectedProduct.stock}
            description={selectedProduct.description}
            image={selectedProduct.image}
            status={selectedProduct.status}
            onClose={() => setSelectedProduct(null)}
            onSave={handleSave}
          />
        </div>
      )}
    </div>
  );
}

export default ManageProducts;
