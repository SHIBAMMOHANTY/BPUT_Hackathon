import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-[100vh]"> {/* 100vh ensures full screen height */}
      <ul>
        <li>
          <Link to="/dashboard/statistics" className="hover:bg-gray-700 p-2 block">
            Statistics
          </Link>
        </li>
        <li>
          <Link to="/dashboard/projects" className="hover:bg-gray-700 p-2 block">
            Projects
          </Link>
        </li>
        <li>
          <Link to="/dashboard/funding" className="hover:bg-gray-700 p-2 block">
            Funding
          </Link>
        </li>
        <li>
          <Link to="/dashboard/reports" className="hover:bg-gray-700 p-2 block">
            Reports
          </Link>
        </li>
        <li>
          <Link to="/dashboard/events" className="hover:bg-gray-700 p-2 block">
            Events
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
