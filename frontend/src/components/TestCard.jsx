import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TestCard = ({ packageId, packageName, testCount, tests, bestPrice }) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("medi-user");

  function handleClick() {
    if (authToken) navigate(`/comparison/${packageId}`);
    else {
      navigate("/login");
      toast("Please login/signup to compare packages");
    }
  }

  return (
    <div
      className="rounded-lg shadow-lg p-6 border w-80 h-[280px] flex flex-col justify-between hover:scale-105 transition-transform duration-300"
      style={{
        background: "linear-gradient(to right, #FAF0E6, #F5F5DC)",
        borderColor: "#F5F5DC",
      }}
    >
      {/* Package Name */}
      <h2 className="text-lg font-semibold break-words" style={{ color: "#333" }}>
        {packageName}
      </h2>

      {/* Test Count Badge */}
      <div
        className="px-3 py-1 mt-10 rounded-md inline-block font-medium text-sm"
        style={{ backgroundColor: "#88C4E7", color: "#fff" }}
      >
        {testCount} Tests Included
      </div>

      {/* Tests Section */}
      <div className="mt-4 text-sm mb-4" style={{ color: "#333" }}>
        <strong>Tests :</strong> {tests}
      </div>

      {/* Price & Button (Forced to Bottom) */}
      <div className="mt-auto">
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold" style={{ color: "#00CC66" }}>
            ₹{bestPrice}
          </span>
        </div>

        <button
          onClick={handleClick}
          className="mt-3 w-full py-2 rounded-md transition text-sm"
          style={{
            backgroundColor: "#F75C03",
            color: "#FAF0E6",
          }}
        >
          Compare Prices
        </button>
      </div>
    </div>
  );
};

export default TestCard;
