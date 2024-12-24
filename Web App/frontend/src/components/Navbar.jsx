import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate=useNavigate()
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
        <div className="flex items-center space-x-4" onClick={()=>navigate("/profile")}>
          <FaUserCircle className="text-3xl" />
          <div className="text-sm">
            <p className="font-semibold">John Doe</p>
            <p className="text-gray-200">Investor</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
