import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from 'axios';
import BACKEND_API_ENDPOINT from '../utils/constants.js'
import { MdDelete } from "react-icons/md";

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
    const [selectedDriverDetails, setSelectedDriverDetails] = useState({});
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [confirmText, setConfirmText] = useState("");

    const openConfirm = () => setIsConfirmOpen(true);
    const closeConfirm = () => {
        setConfirmText("");
        setIsConfirmOpen(false)
    };

    const handleConfirm = async (e)=>{
        try {
            const response = await axios.delete(`${BACKEND_API_ENDPOINT}/api/driver/deletedriver`, {
                data: { _id: selectedDriverDetails._id },
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (response.data.success) {
                setDrivers(prevDrivers => 
                    prevDrivers.filter(driver => driver._id !== selectedDriverDetails._id)
                );
                alert("Driver Removed Successfully!!")
            } else {
                alert('Failed to fetch drivers');
            }
        }catch (error) {
            alert('An error occurred while fetching drivers');
        } finally {
            closeConfirm();
        }
    }

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
            {isConfirmOpen && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
                    onClick={closeConfirm} // Close on clicking the background
                >
                    {/* Modal content */}
                    <div
                        className="bg-white rounded shadow-lg absolute top-auto p-2 w-1/3"
                        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent modal from closing
                    >
                        {/* Modal header */}
                        <div className="flex justify-between items-center border-b px-4 py-2">
                            <h2 className="text-xl font-bold">Confirm Delete<span className='text-gray-400 font-semibold'> {selectedDriverDetails.fullname} ? </span></h2>
                            <button
                                className="text-gray-600 hover:text-red-500 text-2xl ml-4"
                                onClick={closeConfirm}
                            >
                                &times;
                            </button>
                        </div>

                        <div className='flex mx-4 flex-col gap-3 p-2'>
                            <label className='block font-semibold text-gray-400'> Write <span className='text-red-500 font-semibold'>Delete-Driver</span> to proceed </label>
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
                                className={` text-white px-4 py-2 rounded ${(confirmText !== 'Delete-Driver')?'bg-red-200':'bg-red-500 hover:bg-red-600'}`}
                                onClick={handleConfirm}
                                disabled={confirmText !== 'Delete-Driver'}
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
                                <td className={`px-2 py-4 border-b-2 border-blue-200 ${driver.profilevalidate == false ? 'text-red-500' : 'text-green-500'}`}>{(driver.profilevalidate == true) ? "Verified" : "Not verified"}</td>
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">
                                    <Link to={`/driver/update/${driver.phonenumber}`}>
                                        <button className="text-blue-600 mx-1 text-xl"><FaRegEdit /></button>
                                    </Link>
                                    <button className="text-red-600 mx-1 text-xl" onClick={() => {
                                        setSelectedDriverDetails(driver);
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

export default DriverList;
