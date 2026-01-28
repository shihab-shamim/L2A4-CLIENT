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


  // backend json: { success:true, data: TutorProfile }
  const tutorProfile = tutorResp?.data ?? null;


  return (
    <div>
      <TutorProfileForm tutorProfile={tutorProfile?tutorProfile:null} />

    </div>
  );
};

export default TutorProfilePage;
