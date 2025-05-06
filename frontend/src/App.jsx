import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import LogIn from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

// User Pages
import MyTask from "./pages/user/MyTask.jsx";
import ViewTaskDetails from "./pages/user/ViewTaskDetails.jsx";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import ManageUser from "./pages/admin/ManageUser.jsx";
import CreateTask from "./pages/admin/CreateTask.jsx";
import ManageTask from "./pages/admin/ManageTask.jsx";

import { useContext } from "react";
import { UserContext } from "./context/userContext.jsx";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./pages/user/UserDashboard.jsx";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/user",
    element: <ProtectedRoute allowedRoles={["user", "admin"]} />,
    children: [
      { path: "dashboard", element: <UserDashboard /> },
      { path: "tasks", element: <MyTask /> },
      { path: "tasksdetail/:id", element: <ViewTaskDetails /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={["admin"]} />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "users", element: <ManageUser /> },
      { path: "tasks", element: <CreateTask /> },
      { path: "manage-task", element: <ManageTask /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </>
  );
}

export default App;

function Root() {
  const { user, loading } = useContext(UserContext);
  if (loading) return <Outlet />;
  if (!user) {
    return <Navigate to="/login" />;
  }

  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/user/dashboard" />
  );
}
