import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useSignup from "../../hooks/useSignup.js";
import { MdArrowBack } from "react-icons/md";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    pincode: "",
  });

  const { loading, signup } = useSignup();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 via-blue-500 to-blue-700 p-4">
      {/* Back Button - Top Left */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-10 left-8 flex items-center p-3 bg-blue-800 rounded-full hover:bg-blue-700 transition"
      >
        <MdArrowBack className="w-6 h-6 text-white" />
      </button>

      {/* Signup Card */}
      <div className="w-full max-w-md p-6 rounded-lg shadow-xl bg-white">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800">
          Sign Up <span className="text-blue-600">Cura</span>
        </h1>

        <form className="mt-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter full name"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={inputs.phoneNumber}
              onChange={(e) =>
                setInputs({ ...inputs, phoneNumber: e.target.value })
              }
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm password"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">
              Pincode
            </label>
            <input
              type="text"
              placeholder="Enter pincode"
              value={inputs.pincode}
              onChange={(e) =>
                setInputs({ ...inputs, pincode: e.target.value })
              }
              className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-2 rounded-md hover:opacity-90 transition"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Sign Up"
            )}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
