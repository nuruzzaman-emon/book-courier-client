import React from "react";
import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Register from "../Pages/AuthPage/Register/Register";
import Login from "../Pages/AuthPage/Login/Login";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import MyProfile from "../Pages/Dashboard/UserDashboard/MyProfile/MyProfile";
import MyOrders from "../Pages/Dashboard/UserDashboard/MyOrders/MyOrders";
import Invoices from "../Pages/Dashboard/UserDashboard/Invoices/Invoices";
import LibrarianRoute from "./LibrarianRoute/LibrarianRoute";
import AddBook from "../Pages/Dashboard/LibrarianDashboard/AddBook/AddBook";
import MyBooks from "../Pages/Dashboard/LibrarianDashboard/MyBooks/MyBooks";
import Orders from "../Pages/Dashboard/LibrarianDashboard/Orders/Orders";
import AdminRoute from "./AdminRoute/AdminRoute";
import AllUsers from "../Pages/Dashboard/AdminDashboard/AllUsers/AllUsers";
import ManageBooks from "../Pages/Dashboard/AdminDashboard/ManageBooks/ManageBooks";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";

const Router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "my-orders",
        Component: MyOrders,
      },
      {
        path: "invoices",
        Component: Invoices,
      },
      {
        path: "add-book",
        element: (
          <LibrarianRoute>
            <AddBook></AddBook>
          </LibrarianRoute>
        ),
      },
      {
        path: "my-books",
        element: (
          <LibrarianRoute>
            <MyBooks></MyBooks>
          </LibrarianRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <LibrarianRoute>
            <Orders></Orders>
          </LibrarianRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "manage-books",
        element: (
          <AdminRoute>
            <ManageBooks></ManageBooks>
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default Router;
