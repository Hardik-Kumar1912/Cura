import React, { useEffect, useState } from 'react';
import OrderCard from '../../components/OrderCard';

const Orders = () => {
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const authToken = localStorage.getItem("medi-user");
  const customerId = authToken ? JSON.parse(authToken)._id : null;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/auth/transactions/${customerId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();

        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        const grouped = sorted.reduce((acc, order) => {
          const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });

          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(order);
          return acc;
        }, {});

        setOrders(grouped);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-6 lg:px-16 py-6 mb-10 overflow-x-hidden">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1e3a8a] mt-8 sm:mt-10 mb-10 sm:mb-12">
        📦 My Orders
      </h2>

      {loading ? (
        <p className="text-base sm:text-lg text-blue-600 text-center mt-10 animate-pulse">
          Loading your orders...
        </p>
      ) : error ? (
        <p className="text-red-600 font-semibold text-center mt-10">
          ❌ Error: {error}
        </p>
      ) : Object.keys(orders).length === 0 ? (
        <p className="text-gray-600 text-center mt-10">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="space-y-10 sm:space-y-12">
          {Object.entries(orders).map(([date, items]) => (
            <div key={date} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md sm:shadow-lg">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                <h3 className="text-lg sm:text-xl font-semibold text-[#1e293b]">
                  📅 {date}
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium px-3 py-1 rounded-full">
                  {items.length} {items.length === 1 ? "Order" : "Orders"}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="transform transition duration-300 hover:scale-[1.02]"
                  >
                    <OrderCard
                      orderId={item._id}
                      companyId={item.companyId}
                      testName={item.testName}
                      price={item.price}
                      category={item.category}
                      customerId={item.customerId}
                      orderDate={item.createdAt}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
