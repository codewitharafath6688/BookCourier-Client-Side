import { createBrowserRouter } from "react-router";
import Root from "./Root";
import Home from "../Pages/Home";
import AllBooks from "../Pages/AllBooks";
import Coverage from "../Pages/Coverage";
import Dashboard from "../Pages/Dashboard/Dashboard";

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
                Component: Coverage
            }
        ]
    },
    {
        path:'dashboard',
        element: <Dashboard></Dashboard>
    }
])