import React, { useState } from "react";

const SignUp = () => {
  const [userType, setUserType] = useState("business");
  const [disabilityType, setDisabilityType] = useState("");
  const [comment, setComment] = useState("");
  const disabilityTypes = [
    "Visual Impairment",
    "Hearing Impairment",
    "Mobility Issues",
    "Cognitive Disabilities",
    "Speech Impairments",
    "Other",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Sign Up for EbizA
        </h2>
        <form>
          {/* User Type Selector */}
          <label className="block text-sm font-medium text-gray-700">
            User Type
          </label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none mt-1"
          >
            <option value="business">Business User</option>
            <option value="investor">Investor</option>
            <option value="ngo">NGO</option>
          </select>

          {/* Full Name Field */}
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none mt-1"
          />

          {/* Email Address Field */}
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none mt-1"
          />

          {/* Password Field */}
          <label className="block text-sm font-medium text-gray-700 mt-4">
            Password
          </label>
          <input
            type="password"
            placeholder="Create a password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none mt-1"
          />

          {/* Display Disability Options only for Business User */}
          {userType === "business" && (
            <>
              {/* Disabilities Radio Buttons */}
              <label className="block text-sm font-medium text-gray-700 mt-4">
                Types of Disabilities
              </label>
              <div className="mt-2">
                {disabilityTypes.map((type) => (
                  <div key={type} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={type}
                      name="disabilityType"
                      value={type}
                      checked={disabilityType === type}
                      onChange={(e) => setDisabilityType(e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor={type} className="ml-2 block text-sm text-gray-700">
                      {type}
                    </label>
                  </div>
                ))}
              </div>

              {/* Comment Box for 'Other' Disability Type */}
              {disabilityType === "Other" && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Please describe the disability
                  </label>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Enter additional details"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-300 focus:outline-none mt-1"
                    rows="4"
                  />
                </div>
              )}
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 mt-6 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
