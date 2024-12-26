import React, { useState, useEffect } from 'react';
import { BsFillEyeFill } from "react-icons/bs";
import axios from 'axios'
import BACKEND_API_ENDPOINT from '../utils/constants.js'
import { MdDelete } from "react-icons/md";

const CustomerData = () => {
    // Sample data
    const [customer, setCustomers] = useState([]);

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/customer/getallcustomer`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                if (response.data.success) {

                    setCustomers(response.data.data);

                } else {
                    alert('Failed to fetch Customers');
                }
            } catch (error) {
                console.error('Error fetching Customers:', error);
                alert('An error occurred while fetching Customers');
            }
        };

        fetchCustomers();
    }, []);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRideDetails, setSelectedRideDetails] = useState({});
    const [users, setUsers] = useState(customer);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [displayedUsers, setDisplayedUsers] = useState([]);

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [confirmText, setConfirmText] = useState("");

    const openConfirm = () => setIsConfirmOpen(true);
    const closeConfirm = () => {
        setConfirmText("");
        setIsConfirmOpen(false)
    };

    const handleConfirm = async (e) => {
        try {
            const response = await axios.delete(`${BACKEND_API_ENDPOINT}/api/customer/deletecustomer`, {
                data: { _id: selectedRideDetails._id },
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (response.data.success) {
                setCustomers(prevCustomers =>
                    prevCustomers.filter(Customer => Customer._id !== selectedRideDetails._id)
                );
            } else {
                alert('Failed to fetch Customers');
            }
        } catch (error) {
            alert('An error occurred while fetching Customers');
        } finally {
            closeConfirm();
            alert("Customer Deleted Successfully");
        }
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        setUsers(customer);
        const startIdx = (currentPage - 1) * entriesPerPage;
        const endIdx = startIdx + entriesPerPage;
        setDisplayedUsers(users.slice(startIdx, endIdx));
    }, [users, currentPage, entriesPerPage, customer]);

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
        <div className="p-4 bg-[#f7f9ff]">
            {isConfirmOpen && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
                    onClick={closeConfirm}
                >
                    {/* Modal content */}
                    <div
                        className="bg-white rounded shadow-lg absolute top-auto p-2 w-1/3"
                        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent modal from closing
                    >
                        {/* Modal header */}
                        <div className="flex justify-between items-center border-b px-4 py-2">
                            <h2 className="text-xl font-bold">Confirm Delete<span className='text-gray-400 font-semibold'> {selectedRideDetails.firstName} ? </span></h2>
                            <button
                                className="text-gray-600 hover:text-red-500 text-2xl ml-4"
                                onClick={closeConfirm}
                            >
                                &times;
                            </button>
                        </div>

                        <div className='flex mx-4 flex-col gap-3 p-2'>
                            <label className='block font-semibold text-gray-400'> Write <span className='text-red-500 font-semibold'>Delete-Customer</span> to proceed </label>
                            <input
                                placeholder='Delete'
                                type="text"
                                name="confirmText"
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                className="border border-gray-300 rounded p-2"
                            />
                        </div>

                        <div className="flex justify-end p-4 border-t gap-2">
                            <button
                                className={` text-white px-4 py-2 rounded ${(confirmText !== 'Delete-Customer') ? 'bg-red-200' : 'bg-red-500 hover:bg-red-600'}`}
                                onClick={handleConfirm}
                                disabled={confirmText !== 'Delete-Customer'}
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
            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
                    onClick={closeModal} // Close on clicking the background
                >
                    {/* Modal content */}
                    <div
                        className="bg-white rounded shadow-lg absolute top-5 w-2/5 p-4"
                        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent modal from closing
                    >
                        {/* Modal header */}
                        <div className="flex justify-between items-center border-b px-4 py-2">
                            <h2 className="text-xl font-bold">Customer Details</h2>
                            <button
                                className="text-gray-600 hover:text-red-500 text-2xl"
                                onClick={closeModal}
                            >
                                &times;
                            </button>
                        </div>

                        {/* Modal body */}
                        <div className="p-4 space-y-4 flex gap-4">

                            {/*  Details */}
                            <div>
                                <div className=' mb-6'>
                                    <h3 className="text-lg font-semibold border-b pb-2">Details</h3>
                                    <ul className="space-y-1 mt-2 grid grid-cols-2 gap-x-10">
                                        <li><strong>ID: </strong> {selectedRideDetails._id}</li>
                                        <li><strong>Customer: </strong> {selectedRideDetails.firstName} {selectedRideDetails.lastName}</li>

                                        <li><strong>Email: </strong> {selectedRideDetails.email}</li>
                                        <li><strong>Contact info: </strong> {selectedRideDetails.phoneNumber}</li>
                                        <li><strong>Created At: </strong> {selectedRideDetails.savedAt.split("T")[0] || "12 Nov 2024"}</li>
                                        <li><strong>Rides Booked: </strong> {selectedRideDetails.ride_booked || "0"}</li>
                                        <li><strong>Rides Cancelled: </strong> {selectedRideDetails.ride_canceled || "0"}</li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end p-4 border-t gap-2">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}
            <h1 className='text-3xl py-4 font-semibold border-b-2 border-blue-100 bg-white px-2'>Customer List</h1>
            <div className='bg-white py-4 px-2'>
                {/* <div className="flex items-center gap-4 mb-4">
                    <label className="font-semibold">Status(info)</label>
                    <select className="border p-2 rounded">
                        <option value="All">All users</option>
                        <option value="Active">Active users</option>
                        <option value="Inactive">Inactive users</option>
                    </select>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                </div> */}

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
                            <th className="py-4 px-2 border-b-2 border-blue-200">Name</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Email</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Contact Number</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Created Date</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Rides Booked</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Rides Cancelled</th>

                            <th className="py-4 px-2 border-b-2 border-blue-200">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((user, index) => (
                            <tr key={user._id} className="hover:bg-gray-50 text-center">
                                <td className="p-2 border-b-2 border-blue-200">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                                <td className="p-2 border-b-2 border-blue-200">{user.firstName} {user.lastName}</td>
                                <td className="p-2 border-b-2 border-blue-200">{user.email}</td>
                                <td className="p-2 border-b-2 border-blue-200">{user.phoneNumber}</td>
                                <td className="p-2 border-b-2 border-blue-200">{user.savedAt.split("T")[0] || "12 Nov 2024"}</td>
                                <td className="p-2 border-b-2 border-blue-200"> <span className='text-green-500'>{user.ride_booked || "0"} </span></td>
                                <td className="p-2 border-b-2 border-blue-200"><span className='text-red-500'>{user.ride_canceled || "0"}</span></td>

                                <td className="p-2 border-b-2 border-blue-200">
                                    <button className="text-blue-600 mx-1 font-semibold text-xl" onClick={() => {
                                        setSelectedRideDetails(user);
                                        openModal();
                                    }}><BsFillEyeFill /></button>
                                    <button className="text-red-600 mx-1 text-xl" onClick={() => {
                                        setSelectedRideDetails(user);
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

export default CustomerData;
