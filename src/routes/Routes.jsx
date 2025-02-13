import { createBrowserRouter } from "react-router-dom";
// import Register from "../pages/Authentication/Register";
// import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Main from "../layouts/Main";
import SignIn from "../pages/Authentication/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      //   {
      //     path: "/signup",
      //     element: <Register />,
      //   },
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
