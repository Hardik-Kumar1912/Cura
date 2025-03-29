import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton"; 

const Navbar = () => {
  const [user, setUser] = useState(localStorage.getItem("medi-user"));
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem("medi-user");
      if (token !== user) {
        setUser(token);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [user]);

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 border-b border-blue-800">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo on the Left */}
        <NavLink to="/" className="text-2xl font-bold text-white">
          Cura
        </NavLink>

        {/* Navbar Links on the Right */}
        <div className="flex items-center space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium text-lg ${isActive ? "text-blue-200" : "text-white hover:text-blue-200"}`
            }
          >
            Home
          </NavLink>

          {!isAuthenticated ? (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `font-medium text-lg ${isActive ? "text-blue-200" : "text-white hover:text-blue-200"}`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `font-medium text-lg ${isActive ? "text-blue-200" : "text-white hover:text-blue-200"}`
                }
              >
                SignUp
              </NavLink>
            </>
          ) : (
            <LogoutButton />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
