import React, { useEffect, useState } from "react";
import { GiBookshelf } from "react-icons/gi";
import { FaSun, FaMoon } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import useAuth from "../Hooks/useAuth";

const Navber = () => {
  const { user, logOutUser } = useAuth();

  // DaisyUI theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light"; // default light
  });

  useEffect(() => {
    // Apply DaisyUI theme
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
    <div className="navbar shadow-sm bg-base-100 text-base-content">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Link className="flex gap-2 items-center justify-center">
          <GiBookshelf className="text-xl text-red-500" />
          <h2 className="text-2xl font-bold">BookCourier</h2>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end flex items-center gap-2">
        {/* DaisyUI theme toggle */}
        <button onClick={toggleTheme} className="btn btn-ghost btn-sm">
          {theme === "light" ? <FaMoon /> : <FaSun className="text-yellow-400" />}
        </button>

        {/* Auth buttons */}
        {user ? (
          <button onClick={handleLogOut} className="btn btn-primary">
            Sign Out
          </button>
        ) : (
          <>
            <Link to="/user-access/login" className="btn btn-outline">
              Login
            </Link>
            <Link to="/user-access/register" className="btn btn-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navber;
