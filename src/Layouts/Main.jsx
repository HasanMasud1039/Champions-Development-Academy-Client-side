import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";
import Footer from "../Pages/Footer/Footer";

const Main = () => {
  const location = useLocation();
  const noNavbar = location.pathname.includes('login') || location.pathname.includes('registration')
    return (
      <div className="px-0">
        {noNavbar || <Navbar></Navbar>}
        <div className="max-w-screen-2xl mx-auto px-2">
          <Outlet></Outlet>
        </div>
        {noNavbar || <Footer></Footer>}
      </div>
    );
  };
  
  export default Main;