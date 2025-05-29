import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState(localStorage.getItem("medi-user"));
  const [menuOpen, setMenuOpen] = useState(false);
  const isAuthenticated = Boolean(user);
  const userId = user ? JSON.parse(user)._id : null;

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
        {/* Logo */}
        <div className="flex items-center">
          <img src="/Logo.png" alt="Cura Logo" className="h-12 w-12 object-contain" />
          <NavLink to="/" className="text-4xl font-bold text-white mt-1 ml-1 mb-2">
            Cura
          </NavLink>
        </div>

        {/* Hamburger - mobile only if authenticated */}
        {isAuthenticated && (
          <div className="sm:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        )}

        {/* Desktop Nav */}
        {isAuthenticated ? (
          <div className="hidden sm:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `font-medium text-lg ${
                  isActive ? "text-blue-200" : "text-white hover:text-blue-200"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to={`/myOrders/${userId}`}
              className={({ isActive }) =>
                `font-medium text-lg ${
                  isActive ? "text-blue-200" : "text-white hover:text-blue-200"
                }`
              }
            >
              Orders
            </NavLink>
            <LogoutButton />
          </div>
        ) : (
          <div className="flex items-center space-x-6">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `font-medium text-lg ${
                  isActive ? "text-blue-200" : "text-white hover:text-blue-200"
                }`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                `font-medium text-lg ${
                  isActive ? "text-blue-200" : "text-white hover:text-blue-200"
                }`
              }
            >
              SignUp
            </NavLink>
          </div>
        )}
      </div>

      {/* Sidebar Menu for Mobile */}
      {isAuthenticated && (
        <div
          className={`fixed top-0 right-0 h-full w-2/3 max-w-xs bg-blue-600 z-50 transform transition-transform duration-300 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } sm:hidden shadow-lg`}
        >
          <div className="flex justify-end p-4">
            <button onClick={() => setMenuOpen(false)} className="text-white">
              <X size={28} />
            </button>
          </div>

          <div className="flex flex-col px-6 space-y-4">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="text-white text-lg font-medium hover:text-blue-200"
            >
              Home
            </NavLink>
            <NavLink
              to={`/myOrders/${userId}`}
              onClick={() => setMenuOpen(false)}
              className="text-white text-lg font-medium hover:text-blue-200"
            >
              Orders
            </NavLink>
            <div onClick={() => setMenuOpen(false)}>
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
