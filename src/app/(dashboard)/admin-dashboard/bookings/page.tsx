import { userService } from "@/service/user.service";
type Booking = {
  id: string;
  studentId: string;
  tutorId: string;
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

const page =async () => {
    const {data,error}=await userService.getAllBooking();


    return (
        <div>
            <h1 className="text-center text-6xl">All Booking </h1>
           
             {data?.data?.map((booking:Booking) => (
        <div
          key={booking.id}
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
        >
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
      ))}
            
        </div>
    );
};

export default page;