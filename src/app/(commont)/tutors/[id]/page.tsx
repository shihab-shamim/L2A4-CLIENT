import BookButton from "@/componets/dashboard/tutor/BookButton";
import { TutorP } from "@/componets/tutors/tutors.data";
import { userService } from "@/service/user.service";

type Slot = {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
};

const formatDateTime = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

const minutesBetween = (startIso: string, endIso: string) => {
  const start = new Date(startIso).getTime();
  const end = new Date(endIso).getTime();
  return Math.floor((end - start) / 60000);
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await userService.getAllTutorsProfile();
  if (error) return <div className="p-6">Failed to load tutors.</div>;

  const tutor = data?.data?.find((item: TutorP) => item.id === id);
  if (!tutor) return <div className="p-6">Tutor not found.</div>;

  const slots: Slot[] = tutor.availability || [];
  const {data:session,error:userError}=await userService.getSession()

  const isUSer=session?.user.id as string;
 


  return (
    <div className="space-y-6 px-4 py-6">
      {/* ===== Tutor Summary Card ===== */}
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-base font-semibold text-gray-900">
              {tutor?.name}
            </p>

            <p className="mt-1 line-clamp-1 text-sm text-gray-600">
              {tutor?.tutorProfile?.subjects?.length
                ? tutor.tutorProfile.subjects.join(", ")
                : "No subjects added"}
            </p>
          </div>

          <span className="shrink-0 rounded-full bg-gray-900 px-3 py-1 text-xs font-semibold text-white">
            {Number(tutor?.reviews?.avgRating ?? 0).toFixed(1)} ★
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Languages</p>
            <p className="mt-1 text-sm font-semibold text-gray-900 line-clamp-1">
              {tutor?.tutorProfile?.languages?.length
                ? tutor.tutorProfile.languages.join(", ")
                : "N/A"}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Reviews</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {tutor?.reviews?.totalReviews ?? 0}
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Hourly Rate</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {tutor?.tutorProfile?.hourlyRate ?? 0}{" "}
              {tutor?.tutorProfile?.currency ?? "BDT"}
              /hr
            </p>
          </div>

          <div className="rounded-xl bg-gray-50 p-3">
            <p className="text-xs text-gray-500">Available Slots</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">
              {slots.filter((s) => !s.isBooked).length} slots available
            </p>
          </div>
        </div>
      </div>

      {/* ===== Availability Cards ===== */}
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Availability
            </h2>
            <p className="text-sm text-gray-600">
              Select a slot to request a session.
            </p>
          </div>

          <div className="text-xs text-gray-500">
            Total: {slots.length} · Available:{" "}
            {slots.filter((s) => !s.isBooked).length}
          </div>
        </div>

        {slots.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
            No availability slots added yet.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {slots.map((slot) => {
              const mins = minutesBetween(slot.startTime, slot.endTime);
              const isInvalid = mins <= 0;

            const soltId=slot?.id as string
              return (
                <div
                  key={slot.id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium text-gray-500">Start</p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {formatDateTime(slot.startTime)}
                      </p>
                    </div>
                    Booking
                  </div>

                  <div className="mt-3">
                    <p className="text-xs font-medium text-gray-500">End</p>
                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {formatDateTime(slot.endTime)}
                    </p>
                  </div>

                  <div className="mt-3 text-xs text-gray-600">
                    Duration:{" "}
                    <span className="font-semibold text-gray-900">
                      {isInvalid ? "—" : `${mins} mins`}
                    </span>
                  </div>

                {isUSer  && <BookButton  studentId={isUSer} tutorId={tutor?.tutorProfile?.userId} slotId={soltId} />}

                  <p className="mt-2 break-all text-[11px] text-gray-400">
                    Slot ID: {slot.id}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
