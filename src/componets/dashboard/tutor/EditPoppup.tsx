"use client";

import { AvailabilitySlotUpdate } from "@/actions/user.actions";
import { AvailabilitySlot } from "@/app/(dashboard)/tutor-dashboard/availability/page";
import { useState } from "react";
import { toast } from "react-toastify";

const toDateTimeLocal = (isoString: string) => {
  const date = new Date(isoString);
  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

const dateTimeLocalToISO = (value: string) => {
  // "2026-02-01T15:00" -> "2026-02-01T09:00:00.000Z" (depending timezone)
  return new Date(value).toISOString();
};

const EditPopup = ({ slot }: { slot: AvailabilitySlot }) => {
  const [open, setOpen] = useState(false);

  const [startTime, setStartTime] = useState(toDateTimeLocal(slot.startTime));
  const [endTime, setEndTime] = useState(toDateTimeLocal(slot.endTime));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      startTime: dateTimeLocalToISO(startTime),
      endTime: dateTimeLocalToISO(endTime),
    };

    try {
      const {data,error} = await AvailabilitySlotUpdate(slot.id, payload);
      console.log("update response:", data.data);
      if(data.data){
        toast("Slot updated")
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
        className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">
                Edit Availability
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ✕
              </button>
            </div>

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

export default EditPopup;
