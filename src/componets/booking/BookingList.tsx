"use client";

import { cancelBookingAction } from "@/actions/user.actions";
import { Booking } from "@/app/(dashboard)/dashboard/bookings/page";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  bookings: Booking[];
};

export default function BookingList({ bookings }: Props) {
  const [items, setItems] = useState<Booking[]>(bookings);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleCancel = async (bookingId: string) => {
    try {
      setLoadingId(bookingId);

      // ✅ call action (returns {data, error})
      const { data, error } = await cancelBookingAction(bookingId);

      if (error) {
        toast.error(error.message || "Failed to cancel booking");
        return;
      }

      // ✅ optimistic update
      setItems((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "CANCELLED" } : b))
      );

      toast.success("Booking cancelled");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  if (items.length === 0) return <p>No bookings found</p>;

  return (
    <div className="space-y-3">
      {items.map((booking) => (
        <div
          key={booking.id}
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`font-medium ${
                    booking.status === "CONFIRMED"
                      ? "text-green-600"
                      : booking.status === "CANCELLED"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {booking.status}
                </span>
              </p>

              <p className="mt-1 break-all text-sm text-gray-700">
                <span className="font-semibold">Tutor ID:</span>{" "}
                {booking.tutorId}
              </p>
            </div>

            {/* ✅ Cancel Button */}
            <button
              onClick={() => handleCancel(booking.id)}
              disabled={booking.status === "CANCELLED" || loadingId === booking.id}
              className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                booking.status === "CANCELLED"
                  ? "cursor-not-allowed bg-gray-100 text-gray-500"
                  : "bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
              }`}
            >
              {loadingId === booking.id ? "Cancelling..." : "Cancel"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
