"use client";

import { createAvailabilitySlot } from "@/actions/user.actions";
import { useState } from "react";
import { toast } from "react-toastify";

const dateTimeLocalToISO = (value: string) => {
  // "2026-02-01T15:00" -> ISO
  return new Date(value).toISOString();
};

const SlotAddButton = () => {
  const [open, setOpen] = useState(false);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!startTime || !endTime) {
    toast.error("Start & End time required");
    return;
  }

  const startTimeISO = dateTimeLocalToISO(startTime);
  const endTimeISO = dateTimeLocalToISO(endTime);

  try {
    const { data, error } = await createAvailabilitySlot({
      startTime: startTimeISO,
      endTime: endTimeISO,
    });

    if (error) {
      toast.error(error.message);
      console.log(error);
      return;
    }

    toast.success("Slot added successfully");
    setOpen(false);
  } catch (error) {
    console.error("add popup error:", error);
    toast.error("Something went wrong");
  }
};


  return (
    <>
      {/* Open Button */}
      <button
        type="button"
        className="rounded-lg border border-gray-200 bg-blue-500   text-6xl font-semibold text-white p-5 cursor-pointer mt-4"
        onClick={() => setOpen(true)}
      >
        Add Slot
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Add Availability
              </h2>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Start Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  End Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SlotAddButton;
