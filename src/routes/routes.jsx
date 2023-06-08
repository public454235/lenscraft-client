import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import Main from "../layouts/Main";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Classes from "../pages/Classes/Classes";
import Home from "../pages/Home/Home";
import Instructors from "../pages/Instructors/Instructors";
import PrivateRoute from "../pages/PrivateRoutes/PrivateRoute";
import MyEnrolledClasses from "../pages/PrivateRoutes/StudentRoutes/MyEnrolledClasses";
import MySelectedClasses from "../pages/PrivateRoutes/StudentRoutes/MySelectedClasses";
import StudentRoute from "../pages/PrivateRoutes/StudentRoutes/StudentRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
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
    ],
  },
]);
