import React, { useState, useEffect } from 'react';
import axios from 'axios'
import BACKEND_API_ENDPOINT from '../utils/constants.js'

const AdminReport = () => {

    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            try { 
                
                const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/rides/getallrides`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                if (response.data.success) {

                    setReports(response.data.data);
                } else {
                    alert('Failed to fetch reports');
                }
            } catch (error) {
                console.error('Error fetching reports:', error);
                alert('An error occurred while fetching reports');
            }
        };

        fetchReports();
    }, []);

    const [users, setUsers] = useState(reports);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [displayedUsers, setDisplayedUsers] = useState([]);

    useEffect(() => {
        setUsers(reports);
        const startIdx = (currentPage - 1) * entriesPerPage;
        const endIdx = startIdx + entriesPerPage;
        setDisplayedUsers(users.slice(startIdx, endIdx));
    }, [users, currentPage, entriesPerPage,reports]);

    const totalPages = Math.ceil(users.length / entriesPerPage);

    const handleEntriesChange = (e) => {
        setEntriesPerPage(Number(e.target.value));
        setCurrentPage(1);
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
            <div className="px-4 border-b-2 border-blue-100 bg-white">
                <h2 className="text-3xl py-4 font-semibold px-2">Admin Earning Report</h2>
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
                        <tr className="">
                            <th className="py-4 px-2 border-b-2 border-blue-200">Ride Request Id</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Customer Name</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Driver Name</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Pick up Time</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Drop Time</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Total Amount</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Admin Commission</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Driver Commission</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((report, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-1 border-b-2 border-blue-200 text-center">{report.userId.substring(0,5)}...</td>
                                <td className="py-1 border-b-2 border-blue-200 text-center">{report.userName}</td>
                                <td className="py-1 border-b-2 border-blue-200 text-center">{report.driverName}</td>
                                <td className="py-1 border-b-2 border-blue-200 text-center">{report.createdAt.split('T')[0]}</td>
                                <td className="py-1 border-b-2 border-blue-200 text-center">{report.createdAt.split('T')[0]}</td>
                                <td className="py-1 border-b-2 border-blue-200 text-center">₹ {report.totalFare || 0}</td>
                                <td className="py-1 border-b-2 border-blue-200 text-center">₹ {report.commission || 0}</td>
                                <td className="py-1 border-b-2 border-blue-200 text-center">₹ {report.driverEarnings || 0}</td>
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

export default AdminReport;
