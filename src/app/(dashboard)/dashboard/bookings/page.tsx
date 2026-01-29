import BookingList from "@/componets/booking/BookingList";
import { userService } from "@/service/user.service";


export type Booking = {
  id: string;
  tutorId: string;
  studentId: string;
  status: "CONFIRMED" | "CANCELLED" | "PENDING";
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  slotId: string | null;
  categoryId: string | null;
  price: number;
  currency: string;
  note: string | null;
};

export default async function BookingPage() {
  const { data, error } = await userService.myBooking();

  if (error) {
    return <p className="text-red-600">{error.message}</p>;
  }

  const bookings: Booking[] = data?.data ?? [];

  return (
    <div className="p-6">
      <h1 className="mb-4 text-xl font-semibold">My Bookings</h1>
      <BookingList bookings={bookings} />
    </div>
  );
}
