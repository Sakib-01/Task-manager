import { createBrowserRouter } from "react-router-dom";
// import Register from "../pages/Authentication/Register";
// import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Main from "../layouts/Main";
import SignIn from "../pages/Authentication/SignIn";
import Register from "../pages/Authentication/Register";
import MyTask from "../pages/MyTask";
import AddTask from "../pages/AddTask";
import EditTask from "../pages/EditTask";
import PrivateRoute from "./PrivateRoute";
import ViewTask from "../pages/ViewTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/myTask",
        element: (
          <PrivateRoute>
            <MyTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/addTask",
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/taskDetails/:id",
        element: (
          <PrivateRoute>
            <ViewTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/editTask/:id",
        element: (
          <PrivateRoute>
            <EditTask />
          </PrivateRoute>
        ),
      },

      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
    ],
  },
  //   {
  //     path: "*",
  //     element: <ErrorPage />,
  //   },
]);

export default router;
