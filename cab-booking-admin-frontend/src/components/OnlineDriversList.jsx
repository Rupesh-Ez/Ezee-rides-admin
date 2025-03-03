import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BACKEND_API_ENDPOINT from '../utils/constants.js'
import { io } from 'socket.io-client';

const socket = io(BACKEND_API_ENDPOINT, {
    transports: ['websocket', 'polling'],  // ✅ Add "polling" as a fallback
    withCredentials: true,  // ✅ Allow cross-origin credentials
    reconnection: true,  
    reconnectionAttempts: 5,  // ✅ Limit reconnection attempts
    reconnectionDelay: 3000,  // ✅ Wait 3s before reconnecting
});

const OnlineDriverList = () => {
    useEffect(() => {
        const fetchOnlineDrivers = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/driver/get-online-drivers`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                if(response.data.success){
                    setUsers(response.data.data || []);
                }else{
                    alert("failed to fetch drivers");
                }
            } catch (error) {
                console.error('Failed to fetch online drivers', error);
            }
        };

        fetchOnlineDrivers();
        socket.on('sendOnlineDrivers', (updatedDrivers) => {
            setUsers(updatedDrivers);
        });
        return () => {
            socket.off('sendOnlineDrivers');
        };
    }, []);

    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    // const [selectedDriverDetails, setSelectedDriverDetails] = useState({});


    useEffect(() => {
        const startIdx = (currentPage - 1) * entriesPerPage;
        const endIdx = startIdx + entriesPerPage;
        setDisplayedUsers(users.slice(startIdx, endIdx));
    }, [users, currentPage, entriesPerPage]);

    const totalPages = Math.ceil(users.length / entriesPerPage);

    const handleEntriesChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1); // Reset to the first page
    };

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
    };

    const handlePrevious = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };


    return (
        <div className="p-6 bg-[#f7f9ff]">
            <div className="flex justify-between px-4 border-b-2 border-blue-100 bg-white">
                <h2 className="text-3xl py-4 font-semibold px-2">Drivers List</h2>
            </div>
            <div className='bg-white py-4 px-2'>
                <div className='flex justify-between px-5'>
                    <div className="flex items-center mb-4">
                        <label className="mr-2">Show</label>
                        <select
                            value={entriesPerPage}
                            onChange={handleEntriesChange}
                            className="border p-2 rounded"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>50</option>
                            <option value={20}>100</option>
                        </select>
                        <label className="ml-2">entries</label>
                    </div>

                </div>

                <table className="w-full border-collapse border border-blue-200">
                    <thead>
                        <tr className="p-2">
                            <th className="py-6 px-2 border-b-2 border-blue-200">No</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Name</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Contact No</th>

                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((driver, index) => (
                            <tr key={index} className="hover:bg-gray-50 text-center">
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{driver.name}</td>
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{driver.phno}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex items-center justify-between p-4'>
                    <div>
                        <p>Showing all entries</p>
                    </div>

                    <div className="flex justify-center items-center gap-2 mt-4">
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                        >
                            Previous
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlineDriverList;
