import { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios'
import BACKEND_API_ENDPOINT from '../utils/constants.js'

const RecentRequests = () => {
  // const requests = [
  //   { id: 1093, rider: "Harry Singh", date: "November 12, 2024 6:47 PM", driver: "-", status: "Cancelled" },
  //   { id: 1092, rider: "Gannon Travis", date: "November 12, 2024 9:43 PM", driver: "Heather Sanford", status: "Completed" },
  //   { id: 1091, rider: "Gannon Travis", date: "November 12, 2024 9:30 PM", driver: "-", status: "Cancelled" },
  //   { id: 1094, rider: "Gannon Travis", date: "November 12, 2024 9:30 PM", driver: "-", status: "Cancelled" },
  //   { id: 1095, rider: "Rajni Travis", date: "November 12, 2024 9:30 PM", driver: "-", status: "Cancelled" },
  //   { id: 1096, rider: "Bhushan", date: "November 14, 2024 9:30 PM", driver: "Ranaji", status: "Completed" },
    
  // ];


  const [requests, setRideRequest] = useState([]);

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/rides/getlatestrides`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                if (response.data.success) {

                    setRideRequest(response.data.data);

                } else {
                    alert('Failed to fetch rides');
                }
            } catch (error) {
                console.error('Error fetching Rides:', error);
                alert('An error occurred while fetching rides');
            }
        };

        fetchRides();
    }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transform transition-transform hover:scale-105">
      <h2 className="text-xl font-semibold mb-4">Recent Request</h2>
      {!requests && (
        <div>
          <h1 className='text-xl text-center'> No Rides Here !!! </h1>
          </div>
      )}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Driver</th>
            <th className="p-2">Requested Date</th>
            <th className="p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id} className="border-b">
              <td className="p-2">{request._id.substring(0, 4) + "..."}</td>
              <td className="p-2">{request.userName}</td>
              <td className="p-2">{request.driverName}</td>
              <td className="p-2">{request.createdAt.split("T")[0]} {request.createdAt.split("T")[1].split(".")[0]}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-sm font-semibold ${
                    request.status === "confrim" ? "bg-[#4fd69c] text-white" : request.status ==="Cancelled" ?" bg-[#f75676] text-white" :"bg-blue-400 text-white"
                  }`}
                >
                  {request.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentRequests;
