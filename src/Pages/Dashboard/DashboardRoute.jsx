import React from "react";
import { FaUserEdit } from "react-icons/fa";
import { GiBookshelf } from "react-icons/gi";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { MdBookmarkAdd, MdOutlineLocalLibrary, MdSpaceDashboard } from "react-icons/md";
import { PiUsersThreeFill } from "react-icons/pi";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { Link, Outlet } from "react-router";
import useRole from "../../Hooks/useRole";

const DashboardRoute = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">
            <Link className="flex gap-2 items-center justify-center" to="/">
              <GiBookshelf className="text-xl text-red-500" />
              <h2 className="text-2xl">BookCourier</h2>
            </Link>
          </div>
        </nav>
        {/* Page content here */}
        <Outlet></Outlet>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            <li>
              <Link
                to="/dashboard"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Dashboard"
              >
                {/* Settings icon */}
                <MdSpaceDashboard />
                <span className="is-drawer-close:hidden">Dashboard</span>
              </Link>
            </li>
            {/* List item */}
            <li>
              <Link
                to="/dashboard/my-orders"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My Orders"
              >
                {/* Settings icon */}
                <TfiShoppingCartFull />
                <span className="is-drawer-close:hidden">My Orders</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/invoices"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Invoices"
              >
                {/* Settings icon */}
                <LiaFileInvoiceSolid />
                <span className="is-drawer-close:hidden">Invoices</span>
              </Link>
            </li>
            {/* Admin Section */}
            {role === "admin" && (
              <>
                <li>
                  <Link
                    to="/dashboard/librarians-approval"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Librarian's Approval"
                  >
                    {/* Settings icon */}
                    <MdOutlineLocalLibrary />
                    <span className="is-drawer-close:hidden">
                      Librarian's Approval
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/management"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Users Active Role"
                  >
                    {/* Settings icon */}
                    <PiUsersThreeFill />
                    <span className="is-drawer-close:hidden">
                      Users Active Role
                    </span>
                  </Link>
                </li>
              </>
            )}
            {role == "librarian" && (
              <>
                <li>
                  <Link
                    to="/dashboard/add-book"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Book"
                  >
                    <MdBookmarkAdd />
                    <span className="is-drawer-close:hidden">Add Book</span>
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/dashboard/edit-profile"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Edit Profile"
              >
                <FaUserEdit />
                <span className="is-drawer-close:hidden">Edit Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardRoute;
