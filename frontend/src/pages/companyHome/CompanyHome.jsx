import React from "react";
import CompanyCard from "../../components/CompanyCard";

const CompanyHome = () => {
  const companies = [
    {
      id: 1,
      name: "HealthCare Diagnostics",
      packageName: "Full Body Checkup",
      noOfTests: 3,
      tests: "CBC, Lipid Profile, Thyroid Panel",
      price: 1500,
    },
    {
      id: 2,
      name: "MediTest Labs",
      packageName: "Essential Health Package",
      noOfTests: 2,
      tests: "Vitamin D Test, Liver Function Test",
      price: 1200,
    },
    {
      id: 3,
      name: "PathCare Diagnostics",
      packageName: "Advanced Health Screening",
      noOfTests: 3,
      tests: "Kidney Function Test, HbA1c Test, Iron Studies",
      price: 1800,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-[#1E3C6E] text-center mb-8">
        Lal Path Lab HomePage
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            companyName={company.name}
            packageName={company.packageName}
            noOfTests={company.noOfTests}
            tests={company.tests}
            price={company.price}
          />
        ))}
      </div>
    </div>
  );
};

export default CompanyHome;
