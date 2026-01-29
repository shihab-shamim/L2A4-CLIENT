"use client";

import { cancelBookingAction, createReview } from "@/actions/user.actions";
import { Booking } from "@/app/(dashboard)/dashboard/bookings/page";
import { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  bookings: Booking[];
};

export default function BookingList({ bookings }: Props) {
  const [items, setItems] = useState<Booking[]>(bookings);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // ===== Review States =====
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  // ===== Cancel Booking =====
  const handleCancel = async (bookingId: string) => {
    try {
      setLoadingId(bookingId);

      const { error } = await cancelBookingAction(bookingId);

      if (error) {
        toast.error(error.message || "Failed to cancel booking");
        return;
      }

      setItems((prev) =>
        prev.map((b) =>
          b.id === bookingId ? { ...b, status: "CANCELLED" } : b
        )
      );

      toast.success("Booking cancelled");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  // ===== Open Review =====
  const handleReview = (booking: Booking) => {
    setActiveBooking(booking);
    setRating(5);
    setComment("");
    setIsReviewOpen(true);
  };

  // ===== Submit Review (Validation) =====
  const submitReview =async () => {
    if (!activeBooking) return;

    // ❗ Rating validation
    if (rating < 1 || rating > 5) {
      alert("Rating must be between 1 and 5");
      return; // ⛔ stop here
    }


    const reviewData = {
      bookingId: activeBooking.id,
      studentId: activeBooking.studentId,
      tutorId: activeBooking.tutorId,
      rating,
      comment,
    };

     try {
      // setLoadingId(bookingId);

      const {data, error } = await createReview(reviewData);
      console.log("Review",data);
      if(data){
      toast.success("Review submit");
      }
      if(error){
        toast.success("Already submit");
      }

      // if (error) {
      //   toast.error(error.message || "Failed to cancel booking");
      //   return;
      // }

     

      
    } catch {
      toast.error("Something went wrong");
      setIsReviewOpen(false);
    } finally {
      setIsReviewOpen(false);
    }
    
    

  

   
    setIsReviewOpen(false);
    setActiveBooking(null);
  };

  if (items.length === 0) return <p>No bookings found</p>;

  return (
    <>
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

              {/* Cancel */}
              <button
                onClick={() => handleCancel(booking.id)}
                disabled={
                  booking.status === "CANCELLED" ||
                  loadingId === booking.id
                }
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  booking.status === "CANCELLED"
                    ? "cursor-not-allowed bg-gray-100 text-gray-500"
                    : "bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
                }`}
              >
                {loadingId === booking.id ? "Cancelling..." : "Cancel"}
              </button>

              {/* Review */}
              <button
                onClick={() => handleReview(booking)}
                disabled={
                  booking.status === "CANCELLED" ||
                  loadingId === booking.id
                }
                className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  booking.status === "CANCELLED"
                    ? "cursor-not-allowed bg-gray-100 text-gray-500"
                    : "bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-60"
                }`}
              >
                Review
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Review Popup ===== */}
      {isReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-lg bg-white p-4 shadow-lg">
            <h3 className="mb-3 text-sm font-semibold">Submit Review</h3>

            <input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="mb-2 w-full rounded border px-2 py-1 text-sm"
            />

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write comment"
              className="mb-3 w-full rounded border px-2 py-1 text-sm"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsReviewOpen(false)}
                className="rounded px-3 py-1 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={submitReview}
                className="rounded bg-green-600 px-3 py-1 text-xs text-white"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
