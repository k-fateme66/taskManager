import {
  Navigate,
  Outlet,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Archive from "../pages/Archive";
import Header from "../components/Header/Header";
import Tasks from "../pages/Tasks";
import Registration from "../pages/Registration";
import Profile from "../pages/Profile";

const Routers = () => {
  const BrowserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Navigate to="tasks" />,
        },
        {
          path: "tasks",
          element: <Tasks />,
        },
        {
          path: "archives",
          element: <Archive />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "login",
      element: <Registration />,
    },
    {
      path: "signup",
      element: <Registration />,
    },
  ]);
  return <RouterProvider router={BrowserRouter} />;
};

export default Routers;

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
