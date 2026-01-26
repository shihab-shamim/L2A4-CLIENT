import Footer from "@/componets/shered/Footer";
import Navbar from "@/componets/shered/Navbar";


const layout = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    );
};

export default layout;