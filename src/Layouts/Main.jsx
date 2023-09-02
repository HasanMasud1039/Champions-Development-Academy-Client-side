import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Navbar/Navbar";
import Footer from "../Pages/Footer/Footer";

const Main = () => {

    return (
      <div className="px-2">
        <Navbar></Navbar>
        <div className="max-w-screen-2xl mx-auto">
          <Outlet></Outlet>
        </div>
        <Footer></Footer>
      </div>
    );
  };
  
  export default Main;