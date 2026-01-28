"use client";

import { AvailabilitySlotDelete } from "@/actions/user.actions";

const SlotDeleteButton = ({ id }: { id: string }) => {
  const handleDelete = async (deleteId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this availability slot?"
    );

    // ❌ user clicked "No"
    if (!isConfirmed) return;

    try {
      // ✅ TODO: call delete API here
      console.log("Deleting slot:", deleteId);
      const result=await AvailabilitySlotDelete(deleteId)
      console.log("Deleting slot result:", result);

      // example:
      // await deleteAvailabilitySlot(deleteId);
      // router.refresh();

    //   alert("Slot deleted successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to delete slot");
    }
  };

  return (
    <button
      type="button"
      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-gray-50 active:scale-[0.99] cursor-pointer"
      onClick={() => handleDelete(id)}
    >
      Delete
    </button>
  );
};

export default SlotDeleteButton;
