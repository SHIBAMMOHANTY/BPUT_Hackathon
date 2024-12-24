import React from "react";
// import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center px-6">
      <div className="text-center max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-500">EbizA</span>
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Join us in making accessibility a reality. Let’s create impact together!
        </p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 px-6 bg-blue-500 text-white font-medium text-lg rounded-md shadow hover:bg-blue-600 transition"
          >
            Existing User? Login
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="w-full py-3 px-6 bg-gray-100 text-gray-800 font-medium text-lg rounded-md shadow hover:bg-gray-200 transition"
          >
            New User? Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
