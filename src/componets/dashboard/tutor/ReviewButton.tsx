
"use client"

import { createBooking } from "@/actions/user.actions";
import { toast } from "react-toastify";

                // {isUSer  && <  studentId={isUSer} tutorId={tutor?.tutorProfile?.id} soldId={soltId} />}
const ReviewButton = ({studentId,tutorId,slotId}:{studentId:string,tutorId:string,slotId:string}) => {
    // console.log({studentId,tutorId,soldId,startTime:,endTime});
const startTime = "2026-02-01T10:00:00.000Z";
const endTime = "2026-03-01T11:00:00.000Z";
 const handleReview=async()=>{
     console.log({studentId,tutorId,slotId,startTime,endTime});
     try {
        const {data,error}=await createBooking({studentId,tutorId,slotId,startTime,endTime})
        console.log("bookif",data);
        if(data.data){
            toast("booking success")
        }
        
        if(error){
       toast("booking filed")
        }
        
     } catch (error) {
        console.log(error);
        
     }

    // console.log({studentId,tutorId,soldId});
 }
    return (
               <button
               onClick={()=>handleReview()}
                    type="button"
                    // disabled={!canBook}
                    className={`mt-4 w-full rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer ${
                      // canBook
                        "bg-gray-900 text-white hover:bg-gray-800"
                        
                    }`}
                  >
                    {/* {slot.isBooked
                      ? "Already Booked"
                      : isInvalid
                      ? "Invalid Slot"
                      : isPast
                      ? "Slot Ended"
                      : "Book Slot"} */}
                      Review
                  </button>
    );
};

export default ReviewButton ;