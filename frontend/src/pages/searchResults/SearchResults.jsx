import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PackageCard from "../../components/PackageCard";

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
  filterContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
    gap: "0.5rem",
    padding: "0 1rem",
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

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("none");

  useEffect(() => {
    if (!searchTerm) return;

    setLoading(true);
    setError(null);

    fetch(`http://localhost:5000/api/auth/packages/search?q=${encodeURIComponent(searchTerm)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setResults(data);
        } else {
          setResults([]);
          console.warn("API did not return an array:", data);
        }
      })
      .catch((err) => {
        setError(err.message);
        setResults([]);
      })
      .finally(() => setLoading(false));
  }, [searchTerm]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const getSortedResults = () => {
    let sorted = [...results];
    if (sortOption === "priceLowToHigh") {
      sorted.sort((a, b) => a.bestPrice - b.bestPrice);
    } else if (sortOption === "priceHighToLow") {
      sorted.sort((a, b) => b.bestPrice - a.bestPrice);
    } else if (sortOption === "popularity") {
      sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
    return sorted;
  };

  const sortedResults = getSortedResults();

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>
        Search results for: <span style={{ color: "#2980b9" }}>"{searchTerm}"</span>
      </h2>

      {results.length > 0 && (
        <div style={styles.filterContainer}>
          <select value={sortOption} onChange={handleSortChange} style={styles.select}>
            <option value="none">Sort By</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
      )}

      {loading ? (
        <p style={styles.loading}>Loading...</p>
      ) : error ? (
        <p style={styles.error}>Error: {error}</p>
      ) : sortedResults.length === 0 ? (
        <p style={styles.message}>
          No packages/tests found for "{searchTerm}". Please try another search term.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sortedResults.map((pkg) => (
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
      )}
    </div>
  );
};

export default SearchResults;
