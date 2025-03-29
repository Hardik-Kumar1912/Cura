import React from "react";
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ companyName, packageName, noOfTests, tests, price }) => {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/comparison");
  }

  function handleCompanyClick() {
    navigate("/companyHome");
  }

  return (
    <div
      className="rounded-lg shadow-lg p-6 border w-[320px] sm:w-[350px] md:w-[380px] lg:w-[400px] h-full flex flex-col justify-between hover:scale-105 transition-transform duration-300"
      style={{
        background: "linear-gradient(to right, #FAF0E6, #F5F5DC)",
        borderColor: "#F5F5DC",
      }}
    >
      {/* Company & Package Name */}
      <h2
        className="text-lg sm:text-xl font-semibold break-words cursor-pointer hover:underline"
        onClick={handleCompanyClick}
        style={{ color: "#333" }}
      >
        {companyName}
      </h2>

      {/* Test Count Badge */}
      <div
        className="px-4 py-2 mt-3 rounded-md inline-block font-medium text-sm sm:text-base"
        style={{ backgroundColor: "#88C4E7", color: "#fff" }}
      >
        {noOfTests} Tests Included
      </div>

      {/* Tests List */}
      <div className="flex-grow">
        <p className="mt-3 text-sm sm:text-base" style={{ color: "#333" }}>
          <strong>Tests :</strong> {tests}
        </p>
      </div>

      {/* Price & Book Button */}
      <div className="mt-6">
        <span className="text-lg sm:text-xl font-bold" style={{ color: "#00CC66" }}>
          ₹{price}
        </span>

        <button
          onClick={handleClick}
          className="mt-3 w-full py-2 rounded-md transition text-sm sm:text-base"
          style={{
            backgroundColor: "#F75C03",
            color: "#FAF0E6",
          }}
        >
          Book
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
