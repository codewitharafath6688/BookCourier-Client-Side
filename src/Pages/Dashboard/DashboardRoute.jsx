import React from "react";
import { Link, Outlet } from "react-router";
import { GiBookshelf } from "react-icons/gi";
import { MdSpaceDashboard, MdOutlineLocalLibrary, MdOutlineMenuBook, MdBookmarkAdd } from "react-icons/md";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { FaUserEdit, FaAddressBook } from "react-icons/fa";
import { PiUsersThreeFill } from "react-icons/pi";
import { LuSwatchBook } from "react-icons/lu";
import useRole from "../../Hooks/useRole";

const DashboardRoute = () => {
  const { role } = useRole();

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* ================= CONTENT ================= */}
      <div className="drawer-content flex flex-col">

        {/* ===== DASHBOARD NAVBAR ===== */}
        <nav  className="
    navbar w-full
    bg-white dark:bg-gradient-to-r dark:from-[#020617] dark:to-[#0f172a]
    border-b border-gray-200 dark:border-white/10
    px-4
  ">
          <label
            htmlFor="my-drawer-4"
            className="btn btn-ghost btn-square lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              className="size-5"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <Link to="/" className="flex items-center gap-2 ml-2">
            <GiBookshelf className="text-xl text-primary" />
            <span className="text-lg font-semibold text-white tracking-wide">
              Book<span className="text-[#605DFF]">Courier</span>
            </span>
          </Link>
        </nav>

        {/* ===== PAGE CONTENT ===== */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* ================= SIDEBAR ================= */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <aside className="
    w-64 min-h-full
    bg-white dark:bg-gradient-to-b dark:from-[#020617] dark:to-[#020617]
    border-r border-gray-200 dark:border-white/10
  ">

          {/* ===== SIDEBAR BRAND ===== */}
          <div className="px-4 py-5 border-b border-gray-200 dark:border-white/10">
  <div className="flex items-center gap-3">
    <GiBookshelf className="text-2xl text-primary" />
    <div>
      
      <p className="text-xl font-bold text-gray-500 dark:text-gray-400 capitalize">
        {role} dashboard
      </p>
    </div>
  </div>
</div>

          {/* ===== MENU ===== */}
          <ul className="menu px-3 py-4 text-sm text-gray-700 dark:text-gray-200">

            <li>
              <Link to="/dashboard" className="rounded-lg">
                <MdSpaceDashboard />
                Dashboard
              </Link>
            </li>

            {/* ===== USER ===== */}
            {role === "user" && (
              <>
                <li>
                  <Link to="/dashboard/my-orders" className="rounded-lg">
                    <TfiShoppingCartFull />
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/invoices" className="rounded-lg">
                    <LiaFileInvoiceSolid />
                    Invoices
                  </Link>
                </li>
              </>
            )}

            {/* ===== LIBRARIAN ===== */}
            {role === "librarian" && (
              <>
                <li>
                  <Link to="/dashboard/add-book" className="rounded-lg">
                    <MdBookmarkAdd />
                    Add Book
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/my-books" className="rounded-lg">
                    <FaAddressBook />
                    My Books
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/librarian-orders" className="rounded-lg">
                    <LuSwatchBook />
                    Orders
                  </Link>
                </li>
              </>
            )}

            {/* ===== ADMIN ===== */}
            {role === "admin" && (
              <>
                <li>
                  <Link to="/dashboard/librarians-approval" className="rounded-lg">
                    <MdOutlineLocalLibrary />
                    Librarian Approval
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/management" className="rounded-lg">
                    <PiUsersThreeFill />
                    User Roles
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/manage-books" className="rounded-lg">
                    <MdOutlineMenuBook />
                    Manage Books
                  </Link>
                </li>
              </>
            )}

            {/* ===== COMMON ===== */}
            <li className="mt-2">
              <Link to="/dashboard/edit-profile" className="rounded-lg">
                <FaUserEdit />
                Edit Profile
              </Link>
            </li>

          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardRoute;