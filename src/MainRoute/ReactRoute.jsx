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
import PrivateRoute from "./PrivateRoute";
import Librarian from "../Pages/Librarian";
import LibrarianApproval from "../Pages/Dashboard/LibrarianApproval";
import Management from "../Pages/Dashboard/Management";
import Forbidden from "../Pages/Forbidden";
import AdminRoute from "./AdminRoute";
import AddBook from "../Pages/Dashboard/AddBook";
import LibrarianRoute from "./LibrarianRoute";
import MyBooks from "../Pages/Dashboard/MyBooks";
import Orders from "../Pages/Dashboard/Orders";
import ManageBooks from "../Pages/Dashboard/ManageBooks";

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
            {
                path:'librarian',
                element: <PrivateRoute><Librarian></Librarian></PrivateRoute>,
                loader: () => fetch('/serviceCenter.json').then(res => res.json())
            }
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
        element: <PrivateRoute><DashboardRoute></DashboardRoute></PrivateRoute>,
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
            },
            {
                path:'librarians-approval',
                element: <AdminRoute><LibrarianApproval></LibrarianApproval></AdminRoute>
            },
            {
                path:'management',
                element: <AdminRoute><Management></Management></AdminRoute>
            },
            {
                path:'add-book',
                element: <LibrarianRoute><AddBook></AddBook></LibrarianRoute>
            },
            {
                path:'my-books',
                element: <LibrarianRoute><MyBooks></MyBooks></LibrarianRoute>
            },
            {
                path:'librarian-orders',
                element: <LibrarianRoute><Orders></Orders></LibrarianRoute>
            },
            {
                path:'manage-books',
                element: <AdminRoute><ManageBooks></ManageBooks></AdminRoute>
            }
        ]
    },
    {
        path:'forbidden',
        Component: Forbidden
    }
])