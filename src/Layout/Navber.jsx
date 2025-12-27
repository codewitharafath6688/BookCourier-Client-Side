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
    setTheme(theme === "light" ? "dark" : "light");
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-books">All Books</NavLink>
      </li>
      <li>
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li>
        <NavLink to="/librarian">Be a Librarian</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
      )}
    </>
  );

  const handleLogOut = () => {
    logOutUser()
      .then((result) => console.log(result.user))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="navbar bg-base-100 text-base-content shadow-sm px-2 sm:px-4">
      {/* ================= Navbar Start ================= */}
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
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 ml-1">
          <GiBookshelf className="text-red-500" />
          <h2 className="text-xl sm:text-2xl font-bold  sm:block">
            BookCourier
          </h2>
        </Link>
      </div>

      {/* ================= Navbar Center ================= */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* ================= Navbar End ================= */}
      <div className="navbar-end flex items-center gap-1 sm:gap-2">
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="btn btn-ghost btn-sm">
          {theme === "light" ? (
            <FaMoon />
          ) : (
            <FaSun className="text-yellow-400" />
          )}
        </button>

        {/* Desktop Auth Buttons */}
        <div className="hidden sm:flex gap-2">
          {user ? (
            <button onClick={handleLogOut} className="btn btn-primary btn-sm">
              Sign Out
            </button>
          ) : (
            <>
              <Link to="/user-access/login" className="btn btn-outline btn-sm">
                Login
              </Link>
              <Link
                to="/user-access/register"
                className="btn btn-primary btn-sm"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Auth Dropdown */}
        <div className="dropdown dropdown-end sm:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-sm">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40"
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
