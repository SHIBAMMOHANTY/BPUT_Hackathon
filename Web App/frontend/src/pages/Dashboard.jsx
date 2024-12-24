import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-full">
      {/* Sidebar takes up fixed width and full height */}
      <Sidebar />

      {/* Content area takes up remaining space */}
      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
