"use client";

import { updateStudentProfile } from "@/actions/user.actions";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

type UserProfile = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  phone: string | null;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  createdAt: string;
  updatedAt: string;
};

type FormState = {
  name: string;
  email: string;
  phone: string;
  image: string;
};

const fieldLabel =
  "text-xs font-semibold uppercase tracking-wide text-gray-500";

const fieldInput =
  "mt-1 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 outline-none focus:border-gray-400";

export default function EditButtonUser({ user }: { user: UserProfile }) {
  const initialForm = useMemo<FormState>(
    () => ({
      name: user.name ?? "",
      email: user.email ?? "",
      phone: user.phone ?? "",
      image: user.image ?? "",
    }),
    [user]
  );

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(initialForm);

  // ✅ ESC close
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // ✅ lock scroll when open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const openModal = () => {
    // ✅ reset form here (NO effect)
    setForm(initialForm);
    setOpen(true);
  };

  const canSave = form.name.trim().length > 0;

  const onSave =async () => {
    if (!canSave) return;

    const updatedUser: UserProfile = {
      ...user,
      name: form.name.trim(),
      phone: form.phone.trim() || null,
      image: form.image.trim() || null,
      
    };

    console.log("✅ Updated User:", updatedUser);
        try {
          const {data,error} = await updateStudentProfile(updatedUser);
          console.log("update response:", data.data);
          if(data.data){
            toast("Profile updated")
              if(data){
            toast(error?.message)
          }
          }
        } catch (error) {
          console.log("edit popup", error);
        }
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="cursor-pointer rounded-xl border border-gray-200 bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800"
      >
        Edit Profile
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white shadow-sm"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-profile-title"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-gray-200 p-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Edit Profile
                </p>
                <h2
                  id="edit-profile-title"
                  className="mt-1 text-lg font-semibold text-gray-900"
                >
                  Update your info
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="cursor-pointer rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Name */}
                <div>
                  <label className={fieldLabel}>Name</label>
                  <input
                    className={fieldInput}
                    value={form.name}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="Enter name"
                  />
                </div>

                {/* Email (disabled) */}
                <div>
                  <label className={fieldLabel}>Email</label>
                  <input
                    type="email"
                    value={form.email}
                    disabled
                    className="mt-1 w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-100 px-3 py-2 text-sm text-gray-700 outline-none"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className={fieldLabel}>Phone</label>
                  <input
                    className={fieldInput}
                    value={form.phone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="Optional"
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label className={fieldLabel}>Image URL</label>
                  <input
                    className={fieldInput}
                    value={form.image}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, image: e.target.value }))
                    }
                    placeholder="Optional"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="cursor-pointer rounded-xl border border-gray-200 bg-white px-5 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={onSave}
                  disabled={!canSave}
                  className={`rounded-xl border border-gray-200 px-5 py-2 text-sm font-semibold text-white ${
                    canSave
                      ? "cursor-pointer bg-gray-900 hover:bg-gray-800"
                      : "cursor-not-allowed bg-gray-400"
                  }`}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
