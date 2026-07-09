import DashboardHeader from "../dashboard/DashboardHeader";
import ProductTitle from "./ProductTitle";
import { AiOutlineProduct } from "react-icons/ai";
import { BiSolidPlaneTakeOff } from "react-icons/bi";
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

import type { Product } from "../../../lib/types/types";
import { IoIosSearch } from "react-icons/io";
import { useCategories } from "../../../lib/hooks/useCategories";

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

    updateProduct.mutate({
      id: selectedProduct.id,
      data,
    });

    setSelectedProduct(null);
  };

  const handleCreate = (data: any) => {
    createProduct.mutate(data);
    setIsCreateModalOpen(false);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <DashboardHeader
        buttonText="افزودن محصول"
        headerCount={products?.totalCount ?? 0}
        headerName="مدیریت محصولات"
        onAdd={() => setIsCreateModalOpen(true)}
      />

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 p-4">
        <ProductTitle
          count={products?.totalCount ?? 0}
          icon={<AiOutlineProduct />}
          title="کل محصولات"
        />

        <ProductTitle
          count={
            products?.items.reduce((a, b) => a + b.price * b.stock, 0) ?? 0
          }
          icon={<BiSolidPlaneTakeOff />}
          title="ارزش انبار"
        />

        <ProductTitle
          count={products?.items.filter((p) => !p.status).length ?? 0}
          icon={<MdOutlineDetails />}
          title="غیرفعال"
        />
      </div>

      {/* FILTER BAR */}
      <div className="m-4 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 lg:flex-row lg:items-center lg:justify-between">
        {/* SEARCH */}
        <div className="relative w-full lg:max-w-lg">
          <IoIosSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-slate-400" />

          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPageNumber(1);
            }}
            placeholder="جستجوی محصول..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-3 pr-12 pl-4 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-100"
          />
        </div>

        {/* FILTERS (UI only - فعلاً client filter) */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setPageNumber(1);
            }}
            className="min-w-52 rounded-xl border border-slate-300 bg-white px-4 py-3"
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
            className="min-w-44 rounded-xl border border-slate-300 bg-white px-4 py-3"
          >
            <option value="">همه وضعیت‌ها</option>
            <option value="true">فعال</option>
            <option value="false">غیرفعال</option>
          </select>
        </div>
      </div>

      {/* TABLE */}
      <div className="m-4 bg-white">
        <ProductTable
          products={products?.items ?? []}
          onDelete={(id) => deleteProduct.mutate(id)}
          onEdit={handleEdit}
        />
      </div>

      {/* EMPTY STATE */}
      {!isLoading && products?.items.length === 0 && (
        <div className="py-16 text-center text-gray-500">
          محصولی یافت نشد
        </div>
      )}

      {/* PAGINATION INFO */}
      {!isLoading && products?.items.length ? (
        <div className="text-center text-sm text-gray-500">
          نمایش{" "}
          <span className="font-bold text-orange-600">
            {products?.items.length}
          </span>{" "}
          از{" "}
          <span className="font-bold text-orange-600">
            {products?.totalCount}
          </span>{" "}
          محصول
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

      {/* CREATE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <CreateProductModal
            onClose={() => setIsCreateModalOpen(false)}
            onSave={handleCreate}
          />
        </div>
      )}

      {/* EDIT MODAL */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
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
