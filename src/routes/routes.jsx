import { createBrowserRouter } from "react-router-dom";
import NotFoundPage from "../components/NotFoundPage";
import Dashboard from "../layouts/Dashboard";
import Main from "../layouts/Main";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Classes from "../pages/Classes/Classes";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import AdminRoute from "../pages/PrivateRoutes/AdminRoutes/AdminRoute";
import ManageClasses from "../pages/PrivateRoutes/AdminRoutes/ManageClasses";
import ManageUsers from "../pages/PrivateRoutes/AdminRoutes/ManageUsers";
import DashboardHome from "../pages/PrivateRoutes/DashboardHome";
import AddAClass from "../pages/PrivateRoutes/InstructorRoutes/AddAClass";
import InstructorRoute from "../pages/PrivateRoutes/InstructorRoutes/InstructorRoute";
import MyClasses from "../pages/PrivateRoutes/InstructorRoutes/MyClasses";
import PrivateRoute from "../pages/PrivateRoutes/PrivateRoute";
import MyEnrolledClasses from "../pages/PrivateRoutes/StudentRoutes/MyEnrolledClasses";
import MySelectedClasses from "../pages/PrivateRoutes/StudentRoutes/MySelectedClasses";
import Payment from "../pages/PrivateRoutes/StudentRoutes/Payment";
import PaymentHistory from "../pages/PrivateRoutes/StudentRoutes/PaymentHistory";
import StudentRoute from "../pages/PrivateRoutes/StudentRoutes/StudentRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructors",
        element: <Instructors />,
      },
      {
        path: "/classes",
        element: <Classes />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <NotFoundPage />,
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <DashboardHome />,
      },
      // student routes
      {
        path: "my-selected-classes",
        element: (
          <StudentRoute>
            <MySelectedClasses />
          </StudentRoute>
        ),
      },
      {
        path: "my-enrolled-classes",
        element: (
          <StudentRoute>
            <MyEnrolledClasses />
          </StudentRoute>
        ),
      },
      {
        path: "payment",
        element: (
          <StudentRoute>
            <Payment />
          </StudentRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <StudentRoute>
            <PaymentHistory />
          </StudentRoute>
        ),
      },

      // instructor routes
      {
        path: "add-a-class",
        element: (
          <InstructorRoute>
            <AddAClass />
          </InstructorRoute>
        ),
      },
      {
        path: "my-classes",
        element: (
          <InstructorRoute>
            <MyClasses />
          </InstructorRoute>
        ),
      },

      // admin routes
      {
        path: "manage-classes",
        element: (
          <AdminRoute>
            <ManageClasses />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
    ],
  },
]);
