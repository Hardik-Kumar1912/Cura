import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PackageCard from "../../components/PackageCard";
import TestCard from "../../components/TestCard";

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("query") || "";

  const [packages, setPackages] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("none");
  const [testSortOption, setTestSortOption] = useState("none");

  useEffect(() => {
    if (!searchTerm) return;

    setLoading(true);
    setError(null);

    fetch(`/api/auth/packages/search?q=${encodeURIComponent(searchTerm)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setPackages(Array.isArray(data.packages) ? data.packages : []);
        setTests(Array.isArray(data.tests) ? data.tests : []);
      })
      .catch((err) => {
        setError(err.message);
        setPackages([]);
        setTests([]);
      })
      .finally(() => setLoading(false));
  }, [searchTerm]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handleTestSortChange = (e) => {
    setTestSortOption(e.target.value);
  };

  const getSortedPackages = () => {
    let sorted = [...packages];
    if (sortOption === "priceLowToHigh") {
      sorted.sort((a, b) => a.bestPrice - b.bestPrice);
    } else if (sortOption === "priceHighToLow") {
      sorted.sort((a, b) => b.bestPrice - a.bestPrice);
    } else if (sortOption === "popularity") {
      sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
    return sorted;
  };

  const getSortedTests = () => {
    let sorted = [...tests];
    if (testSortOption === "priceLowToHigh") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (testSortOption === "priceHighToLow") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (testSortOption === "alphabetical") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  };

  const sortedPackages = getSortedPackages();
  const sortedTests = getSortedTests();

  return (
    <div className="bg-white min-h-screen px-4 sm:px-8 lg:px-16 py-2">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#2c3e50] mt-14 mb-6">
        Search results for: <span className="text-[#2980b9]">"{searchTerm}"</span>
      </h2>

      {loading ? (
        <p className="text-lg text-blue-500 text-center mt-10">Loading...</p>
      ) : error ? (
        <p className="text-red-600 font-semibold text-center mt-10">Error: {error}</p>
      ) : packages.length === 0 && tests.length === 0 ? (
        <p className="text-gray-600 text-center mt-10">
          No packages or tests found for "{searchTerm}". Please try another search term.
        </p>
      ) : (
        <>
          {sortedPackages.length > 0 && (
            <>
              <div className="flex justify-between items-center mt-14 mb-6 gap-4">
                <h3 className="text-3xl font-semibold text-[#27ae60] pl-1">Packages</h3>
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="px-4 py-2 text-base border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="none">Sort By</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10">
                {sortedPackages.map((pkg) => (
                  <PackageCard
                    key={pkg._id}
                    packageId={pkg._id}
                    packageName={pkg.name}
                    testCount={pkg.noOfTests}
                    tests={pkg.tests}
                    bestPrice={pkg.bestPrice}
                  />
                ))}
              </div>
            </>
          )}

          {sortedTests.length > 0 && (
            <>
              <div className="flex justify-between items-center mt-14 mb-6 gap-4">
                <h3 className="text-3xl font-semibold text-[#8e44ad]">Tests</h3>
                <select
                  value={testSortOption}
                  onChange={handleTestSortChange}
                  className="px-4 py-2 text-base border border-gray-300 rounded-md shadow-sm"
                >
                  <option value="none">Sort By</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                  <option value="alphabetical">Alphabetical (A-Z)</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10">
                {sortedTests.map((test) => (
                  <TestCard
                    key={test._id}
                    packageId={test._id}
                    packageName={test.name}
                    testCount={test.noOfTests}
                    tests={test.tests}
                    bestPrice={test.price}
                  />
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
