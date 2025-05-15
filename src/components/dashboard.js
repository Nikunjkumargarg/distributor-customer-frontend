// // src/components/Dashboard.js
// import React from "react";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   return (
//     <div className="container">
//       <h2>Distributor Dashboard</h2>
//       <ul>
//         <li>
//           <Link to="/upload-distributors">Upload Distributors</Link>
//         </li>
//         <li>
//           <Link to="/create-customer">Create Customer</Link>
//         </li>
//       </ul>
//     </div>
//   );
// }

// src/components/Dashboard.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [role, setRole] = useState("");

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    console.log("userrole", userRole);
    setRole(userRole);
    // Assuming you have an API or data source to fetch customer data
    // Example: Fetching customer data from an API
    if (userRole === "admin") {
      const fetchCustomers = async () => {
        try {
          const response = await fetch("http://localhost:3000/customer/list", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }); // Replace with your API endpoint
          const data = await response.json();
          console.log("data", data);
          setCustomers(data);
        } catch (error) {
          console.error("Error fetching customers:", error);
        }
      };

      fetchCustomers();
    }
  }, []);

  return (
    <div className="container">
      <h2 className="text-xl font-bold mb-4">
        {role === "admin" ? "Admin Dashboard" : "Distributor Dashboard"}
      </h2>
      <ul>
        {role === "admin" && (
          <li>
            <Link to="/upload-distributors">Upload Distributors</Link>
          </li>
        )}
        {role === "distributor" && (
          <li>
            <Link to="/create-customer">Create Customer</Link>
          </li>
        )}
      </ul>
      {role === "admin" && (
        <>
          <h3>Customer List</h3>
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Customer Name</th>
                <th className="px-4 py-2 border">Distributor</th>
              </tr>
            </thead>
            <tbody>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer.id}>
                    <td className="px-4 py-2 border">
                      {customer.customer_name}
                    </td>
                    <td className="px-4 py-2 border">
                      {customer.distributor_name}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-4 py-2 border text-center">
                    No customers available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
