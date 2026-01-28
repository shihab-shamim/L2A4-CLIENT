import { userService } from "@/service/user.service";
export type AvailabilitySlot = {
  id: string;
  tutorId: string;

  startTime: string; // ISO date string
  endTime: string;   // ISO date string

  isBooked: boolean;

  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
};

const Page = async () => {
  const { data, error } = await userService.getAvailabilitySlot();
  console.log(data);

  if (error) {
    return <div>{error.message}</div>;
  }

  // ✅ extract array safely
  const slots = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
    ? data.data
    : [];

  // ✅ no data found
  if (slots.length === 0) {
    return <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          <span className="text-2xl text-gray-500">📭</span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800">
          Data Not Found
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-gray-500 leading-relaxed">
          No availability data is available right now.  
          Please try again later or add new availability slots.
        </p>

        {/* Divider */}
        <div className="my-6 h-px bg-gray-200" />

        {/* Hint */}
        <p className="text-xs text-gray-400">
          Tip: Create availability slots to make them visible here.
        </p>
      </div>
    </div>
  }

  return (
    <div>
      <h2>Availability Slots</h2>

      {slots.map((slot: AvailabilitySlot) => (
        <div key={slot.id}>
          <div>
            {new Date(slot.startTime).toLocaleString()} →{" "}
            {new Date(slot.endTime).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
