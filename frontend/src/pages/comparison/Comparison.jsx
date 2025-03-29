import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import CompanyCard from "../../components/CompanyCard";

const Comparison = () => {
  const { packageId } = useParams(); 
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch(
          `/api/auth/company-packages/by-package-id/${packageId}` 
        ); 
        if (!response.ok) {
          throw new Error("Failed to fetch company data");
        }
        const data = await response.json();
        setCompanies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [packageId]); 

  

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">Package Comparison</h1>

      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
        {companies.map((company) => (
          <CompanyCard
            key={company.id}
            companyName={company.name}
            package={company.package}
            packageCategory={company.packageCategory}
            noOfTests={company.noOfTests}
            tests={company.tests}
            price={company.price}
          />
        ))}
      </div>
    </div>
  );
};

export default Comparison;

