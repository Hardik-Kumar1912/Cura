import { useState, useEffect } from "react";
import { CurrencyRupeeIcon } from '@heroicons/react/24/solid';

const OrderCard = ({
  orderId,
  companyId,
  testName,
  price,
  category,
  customerId,
}) => {
  const [companyName, setCompanyName] = useState("");

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

  return (
    <div
      className="rounded-2xl shadow-md border border-yellow-200 p-6 max-w-xs w-full flex flex-col justify-between
                 bg-gradient-to-r from-yellow-50 via-yellow-100 to-yellow-50
                 hover:shadow-xl hover:scale-[1.03] transition-transform duration-300"
      style={{ borderColor: "#F5F5DC" }}
    >
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 leading-snug" title={testName}>
          {testName}
        </h2>
        <h3
          className="text-md font-semibold text-red-700 mt-4 truncate"
          title={companyName}
        >
          {companyName}
        </h3>
      </div>

      <div className="flex items-center mt-6">
        {/* Optional rupee icon, comment out if not using heroicons */}
        <CurrencyRupeeIcon className="w-6 h-6 text-green-600 mr-1" />
        <span className="text-2xl font-extrabold text-green-700">₹{price}</span>
      </div>
    </div>
  );
};

export default OrderCard;
