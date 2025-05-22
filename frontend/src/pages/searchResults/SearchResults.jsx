import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PackageCard from "../../components/PackageCard";
import TestCard from "../../components/TestCard";

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "2rem auto",
    padding: "0 1rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "1rem",
    color: "#2c3e50",
    textAlign: "center",
  },
  message: {
    fontSize: "1.1rem",
    color: "#7f8c8d",
    textAlign: "center",
    marginTop: "2rem",
  },
  error: {
    color: "#e74c3c",
    fontWeight: "600",
    textAlign: "center",
    marginTop: "2rem",
  },
  loading: {
    fontSize: "1.2rem",
    color: "#3498db",
    textAlign: "center",
    marginTop: "2rem",
  },
  select: {
    padding: "0.6rem 0.9rem",
    fontSize: "1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
    minWidth: "200px",
  },
};

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
    <div style={styles.container}>
      <h2 style={styles.heading}>
        Search results for: <span style={{ color: "#2980b9" }}>"{searchTerm}"</span>
      </h2>

      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : error ? (
        <p style={styles.error}>Error: {error}</p>
      ) : packages.length === 0 && tests.length === 0 ? (
        <p style={styles.message}>
          No packages or tests found for "{searchTerm}". Please try another search term.
        </p>
      ) : (
        <>
          {sortedPackages.length > 0 && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "1rem 0",
                }}
              >
                <h3 style={{ fontSize: "1.5rem", color: "#27ae60" }}>Packages</h3>
                <select value={sortOption} onChange={handleSortChange} style={styles.select}>
                  <option value="none">Sort By</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "2rem 0 1rem",
                }}
              >
                <h3 style={{ fontSize: "1.5rem", color: "#8e44ad" }}>Tests</h3>
                <select value={testSortOption} onChange={handleTestSortChange} style={styles.select}>
                  <option value="none">Sort By</option>
                  <option value="priceLowToHigh">Price: Low to High</option>
                  <option value="priceHighToLow">Price: High to Low</option>
                  <option value="alphabetical">Alphabetical (A-Z)</option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
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
