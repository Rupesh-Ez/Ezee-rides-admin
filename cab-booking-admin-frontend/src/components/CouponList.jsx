import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios';
import BACKEND_API_ENDPOINT from '../utils/constants.js'

const CouponList = () => {
    // Sample data
    const [coupons,setCoupons] = useState([]);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/coupon/getallcoupons`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                if (response.data.success) {

                    setCoupons(response.data.data);

                } else {
                    alert('Failed to fetch regions');
                }
            } catch (error) {
                console.error('Error fetching regions:', error);
                alert('An error occurred while fetching regions');
            }
        };

        fetchCoupons();
    }, []);
   
    const [selectedCouponDetails, setSelectedCouponDetails] = useState({});
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [displayedUsers, setDisplayedUsers] = useState([]);

    const openConfirm = () => setIsConfirmOpen(true);
    const closeConfirm = () => setIsConfirmOpen(false);

    useEffect(() => {
        setUsers(coupons);
        const startIdx = (currentPage - 1) * entriesPerPage;
        const endIdx = startIdx + entriesPerPage;
        setDisplayedUsers(users.slice(startIdx, endIdx));
    }, [users, currentPage, entriesPerPage, coupons]);

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

    const handleConfirm = async (e)=>{
        try {
            const response = await axios.delete(`${BACKEND_API_ENDPOINT}/api/coupon/deletecoupon`, {
                data: { _id: selectedCouponDetails._id },
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (response.data.success) {
                setCoupons(prevCoupons => 
                    prevCoupons.filter(coupon => coupon._id !== selectedCouponDetails._id)
                );
            } else {
                alert('Failed to fetch coupons');
            }
        }catch (error) {
            alert('An error occurred while fetching coupons');
        } finally {
            closeConfirm();
        }
    }

    return (
        <div className="p-4 bg-[#f7f9ff]">
            {isConfirmOpen && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
                    onClick={closeConfirm} // Close on clicking the background
                >
                    {/* Modal content */}
                    <div
                        className="bg-white rounded shadow-lg absolute top-auto p-2"
                        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent modal from closing
                    >
                        {/* Modal header */}
                        <div className="flex justify-between items-center border-b px-4 py-2">
                            <h2 className="text-xl font-bold">Confirm <span className='text-gray-400 font-semibold'>Delete {selectedCouponDetails.code} ? </span></h2>
                            <button
                                className="text-gray-600 hover:text-red-500 text-2xl ml-4"
                                onClick={closeConfirm}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="flex justify-end p-4 border-t gap-2">
                            <button
                                className={` text-white px-4 py-2 rounded bg-red-500 hover:bg-red-600}`}
                                onClick={handleConfirm}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={closeConfirm}
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}
            <div className="flex justify-between px-4 border-b-2 border-blue-100 bg-white">
                <h2 className="text-3xl py-4 font-semibold px-2">Coupons List</h2>
                <Link to='/coupon/create' className="border border-black bg-white text-xl text-black hover:bg-black hover:text-white rounded-md my-3 flex items-center p-2"> + Add Coupan</Link>
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
                            <th className="py-4 px-2 border-b-2 border-blue-200">Code</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Title</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Start Date</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">End Date</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Users</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Status</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((coupon, index) => (
                            <tr key={index} className="hover:bg-gray-50 text-center">
                                <td className="p-2 border-b-2 border-blue-200">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                                <td className="p-2 border-b-2 border-blue-200 font-semibold">{coupon.code}</td>
                                <td className="p-2 border-b-2 border-blue-200 text-center">{coupon.title}</td>
                                <td className="p-2 border-b-2 border-blue-200">{coupon.startDate.split('T')[0]}</td>
                                <td className="p-2 border-b-2 border-blue-200">{coupon.endDate.split('T')[0]}</td>
                                <td className="p-2 border-b-2 border-blue-200 font-semibold">{coupon.users}</td>
                                <td className="p-2 border-b-2 border-blue-200">
                                    <span className={`${coupon.status==="Active" ? 'bg-blue-500':'bg-orange-500'} text-white px-2 py-1 rounded`}>{coupon.status}</span>
                                </td>
                                <td className="p-2 border-b-2 border-blue-200">
                                <Link to={`/coupon/update/${coupon._id}`}>
                                        <button className="text-blue-600 mx-1 text-xl"><FaRegEdit /></button>
                                    </Link>
                                    <button className="text-red-600 mx-1 text-xl" onClick={()=>{
                                        setSelectedCouponDetails(coupon);
                                        openConfirm();
                                    }}><MdDelete /></button>
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

export default CouponList;
