import Footer from "@/componets/shered/Footer";
import Navbar from "@/componets/shered/Navbar";
import { userService } from "@/service/user.service";


const layout =async ({children}:{children:React.ReactNode}) => {
      const session=await userService.getSession()
  console.log("from home page ",session?.data?.user);
    return (
        <div>
            <Navbar user={session?.data?.user}/>
            {children}
            <Footer/>
        </div>
    );
};

export default layout;