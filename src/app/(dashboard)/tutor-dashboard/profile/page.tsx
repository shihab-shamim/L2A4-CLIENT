import TutorProfileForm from "@/componets/tutor/TutorProfileForm ";
import { userService } from "@/service/user.service";

const TutorProfilePage = async () => {
  const { data: session, error: sessionError } = await userService.getSession();

  if (sessionError) {
    return <div>Session error: {sessionError.message}</div>;
  }

  if (!session?.user?.id) {
    return <div>Not logged in</div>;
  }


  const { data: tutorResp, error: tutorError } =
    await userService.getTutorProfile({ userId: session.user.id });

  if (tutorError) {
    return <div>Tutor profile error: {tutorError.message}</div>;
  }

  // backend json: { success:true, data: TutorProfile }
  const tutorProfile = tutorResp?.data ?? null;

  if (!tutorProfile) {
    return <div>No tutor profile found for this user.</div>;
  }
//   console.log(tutorProfile);

  return (
    <div>
      <TutorProfileForm tutorProfile={tutorProfile?tutorProfile:null} />

    </div>
  );
};

export default TutorProfilePage;
