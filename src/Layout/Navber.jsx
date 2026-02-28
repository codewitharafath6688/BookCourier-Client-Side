import React, { useEffect, useState } from "react";
import { GiBookshelf } from "react-icons/gi";
import { FaSun, FaMoon } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";

const Navber = () => {
  const { user, logOutUser } = useAuth();

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const navLinkClass = ({ isActive }) =>
    `
    px-3 py-2 rounded-lg text-sm font-medium
    transition-colors
    ${
      isActive
        ? "text-primary bg-primary/10"
        : "text-base-content/70 hover:text-primary hover:bg-base-200/60"
    }
  `;

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-books" className={navLinkClass}>
          All Books
        </NavLink>
      </li>
      <li>
        <NavLink to="/coverage" className={navLinkClass}>
          Coverage
        </NavLink>
      </li>
      <li>
        <NavLink to="/librarian" className={navLinkClass}>
          Be a Librarian
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard" className={navLinkClass}>
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  const handleLogOut = () => {
    logOutUser().catch(() => {});
  };

  return (
    <div
      className="
      navbar sticky top-0 z-50
      bg-base-100/80 backdrop-blur-md
      border-b border-base-200
      px-2 sm:px-4
    "
    >
      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost btn-sm lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="
              menu menu-sm dropdown-content mt-3 p-2
              bg-base-100 rounded-2xl shadow-lg w-56
            "
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 ml-1">
          <GiBookshelf className="text-primary text-2xl" />
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Book<span className="text-primary">Courier</span>
          </h2>
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-1">{links}</ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end flex items-center gap-1 sm:gap-2">
        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-sm rounded-full"
        >
          {theme === "light" ? (
            <FaMoon />
          ) : (
            <FaSun className="text-yellow-400" />
          )}
        </button>

        {/* Auth */}
        <div className="hidden sm:flex items-center gap-2">
          {user ? (
            <button
              onClick={handleLogOut}
              className="btn btn-primary btn-sm rounded-full px-4"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                to="/user-access/login"
                className="btn btn-ghost btn-sm rounded-full px-4"
              >
                Login
              </Link>
              <Link
                to="/user-access/register"
                className="btn btn-primary btn-sm rounded-full px-4"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Auth */}
        <div className="dropdown dropdown-end sm:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-sm rounded-full">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="
              menu menu-sm dropdown-content mt-3 p-2
              bg-base-100 rounded-2xl shadow-lg w-44
            "
          >
            {user ? (
              <li>
                <button onClick={handleLogOut}>Sign Out</button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/user-access/login">Login</Link>
                </li>
                <li>
                  <Link to="/user-access/register">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navber;
