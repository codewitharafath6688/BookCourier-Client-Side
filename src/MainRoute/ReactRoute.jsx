import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../Pages/Home";
import AllBooks from "../Pages/AllBooks";
import Coverage from "../Pages/Coverage";
import Dashboard from "../Pages/Dashboard/DashboardRoute";
import MyOrders from "../Pages/Dashboard/MyOrders";
import DashboardRoute from "../Pages/Dashboard/DashboardRoute";
import Invoices from "../Pages/Dashboard/Invoices";
import EditProfile from "../Pages/Dashboard/EditProfile";
import DashboardHome from "../Pages/Dashboard/DashboardHome";
import UserAccess from "../Pages/UserAccess/UserAccess";
import Login from "../Pages/UserAccess/Login";
import Register from "../Pages/UserAccess/Register";

export const router = createBrowserRouter([
    {
        path:'/',
        Component:Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path:'all-books',
                Component: AllBooks
            },
            {
                path:'coverage',
                Component: Coverage,
                loader: () => fetch('/serviceCenter.json').then(res => res.json())
            },
        ]
    },
    {
        path:'user-access',
        element: <UserAccess></UserAccess>,
        children: [
            {
                path:'login',
                element: <Login></Login>
            },
            {
                path:'register',
                element: <Register></Register>
            }
        ]
    },
    {
        path:'dashboard',
        element: <DashboardRoute></DashboardRoute>,
        children: [
            {
                index:true,
                element: <DashboardHome></DashboardHome>
            },
            {
                path:'my-orders',
                element: <MyOrders></MyOrders>
            },
            {
                path:'invoices',
                element: <Invoices></Invoices>
            },
            {
                path:'edit-profile',
                element: <EditProfile></EditProfile>
            }
        ]
    }
])