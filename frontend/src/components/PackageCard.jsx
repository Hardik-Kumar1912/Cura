import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";

const PackageCard = ({ packageId, companyId, packageName, testCount, tests, bestPrice ,category }) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem("medi-user");

  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const charLimit = 120;

  const displayedTests = expanded
    ? tests
    : tests.slice(0, charLimit) + (tests.length > charLimit ? "..." : "");

    useEffect(() => {
  if (!companyId) return;

  fetch(`/api/auth/companyName/${companyId}`)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch company name");
      return res.json();
    })
    .then((data) => {
      setCompanyName(data.companyName || "Unknown Company");
    })
    .catch((err) => {
      console.error("Error fetching company name:", err);
      setCompanyName("Unknown Company");
    });
}, [companyId]);

  function handleBooking() {
    const companyIdStr = companyId.toString();
    const testName = packageName;
    const price = bestPrice.toString();
    const userId = JSON.parse(authToken)._id;
    const categoryStr = category.toString();

    fetch("/api/auth/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ companyId: companyIdStr, testName, price , customerId: userId , category: categoryStr }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create transaction");
        }
        return res.json();
      })
      .then(() => {
        toast.success("Package booked successfully!");
      })
      .catch((err) => {
        console.error("Booking failed:", err);
        toast.error("Something went wrong while booking");
      });
  }

  function handleClick() {
    if (authToken) {
      setShowModal(true);
    } else {
      navigate("/login");
      toast("Please login/signup to book tests");
    }
  }

  return (
    <>
      <div
        className="rounded-lg shadow-lg p-6 border w-80 h-[440px] flex flex-col justify-between hover:scale-105 transition-transform duration-300"
        style={{
          background: "linear-gradient(to right, #FAF0E6, #F5F5DC)",
          borderColor: "#F5F5DC",
        }}
      >
        <h2 className="text-lg font-semibold break-words" style={{ color: "#333" }}>
          {packageName}
        </h2>

        <br />

        <h3 className="text-lg font-semibold break-words" style={{ color: "red" }}>
          {companyName}
        </h3>

        <div
          className="px-3 py-1 mt-10 rounded-md inline-block font-medium text-sm"
          style={{ backgroundColor: "#88C4E7", color: "#fff" }}
        >
          {testCount} Tests Included
        </div>

        <div className="mt-4 text-sm overflow-hidden flex-grow min-h-[60px]" style={{ color: "#333" }}>
          <strong>Tests :</strong> {displayedTests}
          {tests.length > charLimit && (
            <span
              className="cursor-pointer"
              onClick={() => setExpanded(!expanded)}
              style={{ color: "#A1887F" }}
            >
              {expanded ? " .. Show Less" : " more"}
            </span>
          )}
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold" style={{ color: "#00CC66" }}>
              ₹{bestPrice}
            </span>
            <div
              className="px-3 py-1 text-xs rounded-md font-medium"
              style={{ backgroundColor: "#F1C40F", color: "#333" }}
            >
              Best Price
            </div>
          </div>

          <button
            onClick={handleClick}
            className="mt-3 w-full py-2 rounded-md transition text-sm"
            style={{
              backgroundColor: "#F75C03",
              color: "#FAF0E6",
            }}
          >
            Book
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleBooking}
        message={`Do you want to book "${packageName}" for ₹${bestPrice}?`}
      />
    </>
  );
};

export default PackageCard;
