"use client";

import { addCategory, deleteCategory, updateCategory } from "@/actions/user.actions";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Category = {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
};

export default function CategoryList({ data }: { data: Category[] }) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // ✅ Edit popup state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  // ✅ Edit form state
  const [form, setForm] = useState({
    name: "",
    slug: "",
    isActive: true,
  });

  // ✅ Add popup state
  const [isAddOpen, setIsAddOpen] = useState(false);

  // ✅ Add form state
  const [addForm, setAddForm] = useState({
    name: "",
    slug: "",
    isActive: true,
  });

  // ✅ Open Edit popup + set default values
  const openEdit = (item: Category) => {
    setEditing(item);
    setForm({
      name: item.name,
      slug: item.slug,
      isActive: item.isActive,
    });
    setIsEditOpen(true);
  };

  // ✅ Close Edit popup
  const closeEdit = () => {
    setIsEditOpen(false);
    setEditing(null);
  };

  // ✅ Save Edit (update API call)
  const handleSaveEdit = async () => {
    if (!editing) return;

    const updated = {
      name: form.name,
      slug: form.slug,
      isActive: form.isActive,
    };

    console.log("Updated Category:", updated);

    try {
      const { data: resData, error } = await updateCategory(editing.id, updated);

      if (resData) toast("Category updated successfully");
      if (error) toast(error.message || "Category update failed");

      console.log({ error });
      console.log("Updated response:", resData);

      closeEdit();
    } catch (e) {
      console.error(e);
      toast("Category update failed");
    }
  };

  // ✅ Delete
  const handleDelete = async (id: string) => {
    const ok = confirm("Are you sure you want to delete this category?");
    if (!ok) return;

    try {
      setLoadingId(id);

      const { data: resData, error } = await deleteCategory(id);

      if (resData?.data) toast("Category delete successful");
      if (error) toast(error.message || "Category delete failed");

      console.log({ error });
      console.log("Deleted:", id);
    } catch (e) {
      console.error(e);
      alert("Delete failed");
    } finally {
      setLoadingId(null);
    }
  };

  // ✅ Open Add popup
  const openAdd = () => {
    setAddForm({ name: "", slug: "", isActive: true });
    setIsAddOpen(true);
  };

  // ✅ Close Add popup
  const closeAdd = () => {
    setIsAddOpen(false);
  };

  // ✅ Add (just show data in console)
  const handleAdd = async () => {

     try {
      

      const { data: resData, error } =await addCategory(addForm);

      if (resData?.data) toast("Category add successful");
      if (error) toast(error.message || "Category add failed");

     
    } catch (e) {
      console.error(e);
      toast("Add failed");
    }
    closeAdd();
  };

  return (
    <section className="w-full">
      {/* Header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Categories
            </p>
            <h2 className="mt-1 text-xl font-semibold text-gray-900 sm:text-2xl">
              Manage Subjects
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              View active/inactive subjects with slug details.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
            <button onClick={openAdd} className="cursor-pointer">
              Add Category
            </button>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
            <p className="text-xs font-semibold text-gray-600">Total</p>
            <p className="text-lg font-semibold text-gray-900">{data.length}</p>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Table Head (Desktop) */}
        <div className="hidden grid-cols-12 gap-4 border-b border-gray-200 bg-gray-50 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-600 sm:grid">
          <div className="col-span-4">Name</div>
          <div className="col-span-4">Slug</div>
          <div className="col-span-2 text-right">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-gray-200">
          {data.map((item, idx) => (
            <div
              key={item.id}
              className="px-5 py-4 transition hover:bg-gray-50"
            >
              {/* Desktop Row */}
              <div className="hidden grid-cols-12 items-center gap-4 sm:grid">
                <div className="col-span-4">
                  <p className="text-sm font-semibold text-gray-900">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    #{idx + 1} • subject
                  </p>
                </div>

                <div className="col-span-4">
                  <span className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700">
                    {item.slug}
                  </span>
                </div>

                <div className="col-span-2 flex justify-end">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                      item.isActive
                        ? "border-gray-200 bg-white text-gray-900"
                        : "border-gray-200 bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        item.isActive ? "bg-gray-900" : "bg-gray-400"
                      }`}
                    />
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(item)}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    disabled={loadingId === item.id}
                    className="rounded-lg border border-gray-200 bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                  >
                    {loadingId === item.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>

              {/* Mobile Card */}
              <div className="sm:hidden">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-gray-900">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Slug: <span className="text-gray-700">{item.slug}</span>
                    </p>
                  </div>

                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold ${
                      item.isActive
                        ? "border-gray-200 bg-white text-gray-900"
                        : "border-gray-200 bg-gray-100 text-gray-700"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        item.isActive ? "bg-gray-900" : "bg-gray-400"
                      }`}
                    />
                    {item.isActive ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs text-gray-500">#{idx + 1}</div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(item)}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-100"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item.id)}
                      disabled={loadingId === item.id}
                      className="rounded-lg border border-gray-200 bg-gray-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {loadingId === item.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {data.length === 0 && (
            <div className="px-5 py-10 text-center">
              <p className="text-sm font-medium text-gray-700">
                No categories found
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Add some categories to see them here.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ✅ Edit Popup */}
      {isEditOpen && editing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeEdit}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-900">Edit Category</h3>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600">
                  Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600">
                  Slug
                </label>
                <input
                  value={form.slug}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, slug: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, isActive: e.target.checked }))
                  }
                />
                Active
              </label>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeEdit}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSaveEdit}
                className="rounded-lg border border-gray-200 bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 cursor-pointer"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Add Popup */}
      {isAddOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={closeAdd}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-semibold text-gray-900">Add Category</h3>

            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-gray-600">
                  Name
                </label>
                <input
                  value={addForm.name}
                  onChange={(e) =>
                    setAddForm((p) => ({ ...p, name: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600">
                  Slug
                </label>
                <input
                  value={addForm.slug}
                  onChange={(e) =>
                    setAddForm((p) => ({ ...p, slug: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={addForm.isActive}
                  onChange={(e) =>
                    setAddForm((p) => ({ ...p, isActive: e.target.checked }))
                  }
                />
                Active
              </label>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={closeAdd}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleAdd}
                className="rounded-lg border border-gray-200 bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
