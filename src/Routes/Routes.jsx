import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Registration from "../Pages/Login_and_Registration/Registration/Registration";
import Login from "../Pages/Login_and_Registration/Login/Login";
import AllClasses from "../Pages/AllClasses/AllClasses";
import Instructors from "../Pages/Instructors/Instructors";
import Dashboard from "../Layouts/Dashboard";
import WelcomeHome from "../Pages/Dashboard/WelcomeHome/WelcomeHome";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ManageClasses from "../Pages/Dashboard/Admin/ManageClasses/ManageClasses";
import AddClass from "../Pages/Dashboard/Instructor/AddClass/AddClass";
import MyClasses from "../Pages/Dashboard/Instructor/MyClasses/MyClasses";
import Payment from "../Pages/Dashboard/User/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/User/PaymentHistory/PaymentHistory";
import EnrolledClass from "../Pages/Dashboard/User/EnrolledClass/EnrolledClass";
import SelectedClass from "../Pages/Dashboard/User/SelectedClass/SelectedClass";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome/AdminHome";
import InstructorInbox from "../Pages/Dashboard/Instructor/InstructorInbox/InstructorInbox";
import UserHome from "../Pages/Dashboard/User/UserHome/UserHome";
import InstructorHome from "../Pages/Dashboard/Instructor/InstructorHome/InstructorHome";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import InstructorRoute from "./InstructorRoute";
import About from "../Pages/About/About";
import SuperAdminRoute from "./SuperAdminRoute";
import SuperAdminUsers from "../Pages/Dashboard/SuperAdmin/SuperAdminUsers";
import SuperAdminClasses from "../Pages/Dashboard/SuperAdmin/SuperAdminClasses";
import SuperAdminHome from "../Pages/Dashboard/SuperAdmin/SuperAdminHome";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/about",
        element: <About/>,
      },
      {
        path: "/registration",
        element: <Registration></Registration>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/instructors",
        element: <Instructors></Instructors>,
        loader: () => fetch('https://champions-development-academy-server.vercel.app/classes/instructor')
      },
      {
        path: "/allClasses",
        element: <AllClasses></AllClasses>,
        loader: () => fetch("https://champions-development-academy-server.vercel.app/classes/all")
      }
    ]
  },
  {
    path: "/dashboard",
    errorElement:<ErrorPage></ErrorPage>,
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard", // Update the path to be relative
        element: <WelcomeHome></WelcomeHome>,
      },
      {
        path: "SuperUsers", // Update the path to be relative
        element: (
          <SuperAdminRoute>
            <SuperAdminUsers/>
          </SuperAdminRoute>
        ),
      },
      {
        path: "SuperClasses",
        element: (
          <SuperAdminRoute>
            <SuperAdminClasses/>
          </SuperAdminRoute>
        ),
      },
      {
        path: "SuperAdminHome",
        element: (
          <SuperAdminRoute>
          <SuperAdminHome/>
        </SuperAdminRoute>
        ),
      },
      {
        path: "manageUsers", // Update the path to be relative
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manageClasses",
        element: (
          <AdminRoute>
            <ManageClasses></ManageClasses>
          </AdminRoute>
        ),
      },
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "addClass",
        element: (
          <InstructorRoute>
            <AddClass></AddClass>
          </InstructorRoute>
        ),
      },
      {
        path: "myClasses",
        element: (
          <InstructorRoute>
            <MyClasses></MyClasses>
          </InstructorRoute>
        ),
      },
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "selectedClasses",
        element: <SelectedClass></SelectedClass>
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "enrolledClasses",
        element: <EnrolledClass></EnrolledClass>
      },
      {
        path: "instructorInbox",
        element: (
          <InstructorRoute>
            <InstructorInbox></InstructorInbox>
          </InstructorRoute>
        )
      },
      {
        path: "userHome",
        element: <UserHome></UserHome>
      },
      {
        path: "instructorHome",
        element: (
          <InstructorRoute>
            <InstructorHome></InstructorHome>
          </InstructorRoute>
        )
      }
    ]
  }
]);

export default router;