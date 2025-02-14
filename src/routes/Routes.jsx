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
        element: <MyTask />,
      },
      {
        path: "/addTask",
        element: <AddTask />,
      },
      {
        path: "/editTask/:id",
        element: <EditTask />,
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
