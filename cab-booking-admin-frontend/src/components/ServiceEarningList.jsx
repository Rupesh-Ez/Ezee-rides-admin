import React, { useState, useEffect } from 'react';

const ServiceEarningList = () => {
    // Sample data
    const reports = [
        { id: 11, service: 'Economy', user: 'Micky mouse', driver: 'Donald duck', pickup:'November 20, 2024 1:41 PM', drop:'November 20, 2024 1:49 PM', createdDate: 'November 20, 2024 1:45 PM' },
        { id: 12, service: 'Premium', user: 'Micky mouse', driver: 'Donald duck', pickup:'November 20, 2024 1:41 PM', drop:'November 20, 2024 1:49 PM', createdDate: 'November 20, 2024 1:45 PM' },
        { id: 13, service: 'Economy', user: 'Micky mouse', driver: 'Donald duck', pickup:'November 20, 2024 1:41 PM', drop:'November 20, 2024 1:49 PM', createdDate: 'November 20, 2024 1:45 PM' },
        { id: 14, service: 'Premium', user: 'Micky mouse', driver: 'Donald duck', pickup:'November 20, 2024 1:41 PM', drop:'November 20, 2024 1:49 PM', createdDate: 'November 20, 2024 1:45 PM' },
        { id: 15, service: 'Economy', user: 'Micky mouse', driver: 'Donald duck', pickup:'November 20, 2024 1:41 PM', drop:'November 20, 2024 1:49 PM', createdDate: 'November 20, 2024 1:45 PM' },
        { id: 16, service: 'Premium', user: 'Micky mouse', driver: 'Donald duck', pickup:'November 20, 2024 1:41 PM', drop:'November 20, 2024 1:49 PM', createdDate: 'November 20, 2024 1:45 PM' },
        { id: 17, service: 'Economy', user: 'Micky mouse', driver: 'Donald duck', pickup:'November 20, 2024 1:41 PM', drop:'November 20, 2024 1:49 PM', createdDate: 'November 20, 2024 1:45 PM' },
        { id: 18, service: 'Premium', user: 'Micky mouse', driver: 'Donald duck', pickup:'November 20, 2024 1:41 PM', drop:'November 20, 2024 1:49 PM', createdDate: 'November 20, 2024 1:45 PM' },
        { id: 19, service: 'Premium', user: 'Micky mouse', driver: 'Donald duck', pickup:'November 20, 2024 1:41 PM', drop:'November 20, 2024 1:49 PM', createdDate: 'November 20, 2024 1:45 PM' },
        { id: 20, service: 'Economy', user: 'Micky mouse', driver: 'Donald duck', pickup:'November 20, 2024 1:41 PM', drop:'November 20, 2024 1:49 PM', createdDate: 'November 20, 2024 1:45 PM' },

    ];

    const [users, setUsers] = useState(reports);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [displayedUsers, setDisplayedUsers] = useState([]);

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
            <div className="px-4 border-b-2 border-blue-100 bg-white">
                <h2 className="text-3xl py-4 font-semibold px-2">Service Wise Report</h2>
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
                            <th className="py-4 px-2 border-b-2 border-blue-200">No</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Service</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Customer Name</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Driver Name</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">PickUp Time</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Drop time</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Created Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((report, index) => (
                            <tr key={report.id} className="hover:bg-gray-50">
                                <td className="py-2 border-b-2 border-blue-200 text-center">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                                <td className="py-2 border-b-2 border-blue-200 text-center">{report.service}</td>
                                <td className="py-2 border-b-2 border-blue-200 text-center">{report.user}</td>
                                <td className="py-2 border-b-2 border-blue-200 text-center">{report.driver}</td>
                                <td className="py-2 border-b-2 border-blue-200 text-center">{report.pickup}</td>
                                <td className="py-2 border-b-2 border-blue-200 text-center">{report.drop}</td>
                                <td className="py-2 border-b-2 border-blue-200 text-center">{report.createdDate}</td>
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

export default ServiceEarningList;
