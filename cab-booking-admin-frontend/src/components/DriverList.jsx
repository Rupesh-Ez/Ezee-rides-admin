import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import BACKEND_API_ENDPOINT from '../utils/constants.js'

const DriverList = ({ pending }) => {
    
    const [drivers, setDrivers] = useState([]);
    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/driver/getalldrivers`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                if (response.data.success) {
                    setDrivers(response.data.data);

                } else {
                    alert('Failed to fetch drivers');
                }
            } catch (error) {
                alert('An error occurred while fetching drivers');
            } 
        };

        fetchDrivers();
    }, []);

    const [users, setUsers] = useState(drivers);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [displayedUsers, setDisplayedUsers] = useState([]);

    useEffect(() => {
        const filteredDrivers = pending 
            ? drivers.filter(driver => !driver.profilevalidate) 
            : drivers;
        setUsers(filteredDrivers);
    }, [drivers, pending]);

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

                <table className="w-full border-collapse border border-blue-200">
                    <thead>
                        <tr className="p-2">
                            <th className="py-6 px-2 border-b-2 border-blue-200">No</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Name</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Email</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Contact No</th>
                            {/* <th className="py-6 px-2 border-b-2 border-blue-200">Date Created</th> */}
                            <th className="py-6 px-2 border-b-2 border-blue-200">DOB</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Vechicle</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Verification</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((driver, index) => (
                            <tr key={index} className="hover:bg-gray-50 text-center">
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{driver.fullname}</td>
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{driver.email}</td>
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{driver.phonenumber}</td>
                                
                                {/* <td className="px-2 py-4 border-b-2 border-blue-200 ">{driver.createdAt}</td> */}
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{driver.dateOfBirth}</td>
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{driver.vehicletype}</td>
                                <td className={`px-2 py-4 border-b-2 border-blue-200 ${driver.profilevalidate ==false ? 'text-red-500' : 'text-green-500'}`}>{(driver.profilevalidate==true)?"Verified":"Not verified"}</td>
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">
                                    <Link to={`/driver/update/${driver.phonenumber}`}>
                                        <button className="text-blue-600 mx-1 text-xl"><FaRegEdit /></button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex items-center justify-between p-4'>
                    <div>
                        <p>Showing 10 of 15 entries</p>
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

export default DriverList;
