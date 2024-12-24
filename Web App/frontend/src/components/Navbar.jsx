import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  // Check if the current route starts with '/dashboard'
  const shouldHideNavbar = location.pathname.startsWith("/dashboard");

  if (shouldHideNavbar) {
    return null; // Hide Navbar if the route starts with '/dashboard'
  }

  return (
    <nav className="bg-blue-500 text-white py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">Mythicka Groups</div>

        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/project-explorer" className="hover:underline">
              Project Explorer
            </Link>
          </li>
          <li>
            <Link to="/knowledge-hub" className="hover:underline">
              Knowledge Hub
            </Link>
          </li>
          <li>
            <Link to="/events" className="hover:underline">
              Events
            </Link>
          </li>
        </ul>

        {/* Profile Section */}
        <div
          className="relative"
          onMouseEnter={() => setIsProfileMenuOpen(true)}
          onMouseLeave={() => setIsProfileMenuOpen(false)}
        >
          <div className="flex items-center space-x-4 cursor-pointer">
            <FaUserCircle className="text-3xl" />
            <div className="text-sm">
              <p className="font-semibold">John Doe</p>
              <p className="text-gray-200">Investor</p>
            </div>
          </div>

          {/* Profile Menu */}
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
              <ul className="py-2">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/dashboard/statistics")}
                >
                  Dashboard
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    // Add logout logic here
                    navigate("/");
                  }}
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
