import React, { useState, useEffect } from 'react';

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [currentOrderIndex, setCurrentOrderIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch data from the server
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/orders'); // Make sure to replace with the correct URL
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOrders(data);
      setCurrentOrderIndex(0); // Reset to the first order when new data is fetched
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Button click handler
  const handleFetchClick = () => {
    fetchOrders();
  };

  // Slider navigation handlers
  const handlePrevClick = () => {
    setCurrentOrderIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : orders.length - 1));
  };

  const handleNextClick = () => {
    setCurrentOrderIndex((prevIndex) => (prevIndex < orders.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="p-6">
      <button 
        onClick={handleFetchClick} 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Fetch Orders
      </button>
      {loading && <p className="mt-4 text-blue-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">Error: {error}</p>}
      {orders.length === 0 && !loading && !error && (
        <p className="mt-4 text-gray-500">No orders available. Click "Fetch Orders" to load data.</p>
      )}
      {orders.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between mb-4">
            <button 
              onClick={handlePrevClick} 
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Previous
            </button>
            <button 
              onClick={handleNextClick} 
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
          <div className="bg-white border border-gray-300 p-4 rounded-lg overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">ID</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-left">Order Number</th>
                  <th className="py-3 px-6 text-left">Client INN</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Name Agency</th>
                  <th className="py-3 px-6 text-left">Currency</th>
                  <th className="py-3 px-6 text-left">Sum Order</th>
                  <th className="py-3 px-6 text-left">VIP Commission</th>
                  <th className="py-3 px-6 text-left">Commission Plus Percent</th>
                  <th className="py-3 px-6 text-left">Money Rate</th>
                  <th className="py-3 px-6 text-left">Order Rate RUB</th>
                  <th className="py-3 px-6 text-left">Agency Award</th>
                  <th className="py-3 px-6 text-left">Real Award</th>
                  <th className="py-3 px-6 text-left">Sum</th>
                  <th className="py-3 px-6 text-left">Letter of Credit</th>
                  <th className="py-3 px-6 text-left">Invoice</th>
                  <th className="py-3 px-6 text-left">Date Contract Signed</th>
                  <th className="py-3 px-6 text-left">Date Close Deal</th>
                  <th className="py-3 px-6 text-left">Purpose of Payment</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{orders[currentOrderIndex].id}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].status}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].order_number}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].client_inn || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].date}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].name_agency}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].currency || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].sum_order || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].vip_commission || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].commision_plus_percent || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].money_rate || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].order_rate_rub || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].agency_award || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].real_award || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].sum || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].letter_of_credit || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].invoice || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].date_contract_signed || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].date_close_deal || 'N/A'}</td>
                  <td className="py-3 px-6 text-left">{orders[currentOrderIndex].purpose_of_payment || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
