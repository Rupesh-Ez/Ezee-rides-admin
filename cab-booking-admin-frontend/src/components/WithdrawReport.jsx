import React, { useState, useEffect } from 'react';
import axios from 'axios'
import BACKEND_API_ENDPOINT from '../utils/constants.js'
import { BsFillEyeFill } from 'react-icons/bs';

const WithdrawReport = () => {
    const [reports, setReports] = useState([]);

    
    const fetchReports = async () => {
        try {
            const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/withdraw/getallwithdraws`, {
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
    useEffect(() => {
        fetchReports();
    }, []);
    
    const getDriverDetails = async ()=>{
        try {
            const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/driver/getdriverbyid/${selectedRequestDetails.phonenumber}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
              });
              if (response.data.success) {
                setDriverDetails(response.data.data);
            } else {
                alert('Failed to fetch drivers');
            }
        } catch (error) {
            alert('An error occurred while fetching drivers');
        }
    }
    
    const handleConfirm = async () => {
        try {
            const payload = { 
                balance: selectedRequestDetails.balance, 
                request: selectedRequestDetails.request 
            };
            const response = await axios.post(
                `${BACKEND_API_ENDPOINT}/api/withdraw/updaterequest/${selectedRequestDetails.phonenumber}`,
                payload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
    
            if (response.data.success) {
                alert("Withdrawal request updated successfully.");
                fetchReports();
            } else {
                alert("Failed to update withdrawal request.");
            }
        } catch (error) {
            console.error("Error updating withdrawal request:", error);
            alert("An error occurred while processing the request.");
        } finally {
            closeModal();
        }
    };
    
    
    const [selectedRequestDetails, setSelectedRequestDetails] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState(reports);
    const [driverDetails, setDriverDetails] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [displayedUsers, setDisplayedUsers] = useState([]);
    
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    useEffect(() => {
        // Trigger getDriverDetails whenever selectedRequestDetails changes
        if (selectedRequestDetails?.phonenumber) {
            getDriverDetails();
        }
    }, [selectedRequestDetails]);
    
    const handleViewDetails = (report) => {
        setSelectedRequestDetails(report); // This will trigger the above useEffect
        openModal(); // Open the modal
    };
    
    useEffect(() => {
        setUsers(reports)
        const startIdx = (currentPage - 1) * entriesPerPage;
        const endIdx = startIdx + entriesPerPage;
        setDisplayedUsers(users.slice(startIdx, endIdx));
    }, [users, currentPage, entriesPerPage,reports]);

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
                            <h2 className="text-xl font-bold">Withdrawl Request Details</h2>
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
                                    <h3 className="text-lg font-semibold border-b pb-2">Driver Details</h3>
                                    <ul className="space-y-1 mt-2 grid grid-cols-2 gap-x-10 gap-y-2">
                                        <li><strong>ID : </strong> <span className='text-gray-500' >{driverDetails._id}</span></li>
                                        <li><strong>Driver : </strong> <span >{driverDetails.fullname}</span></li>
                                        <li><strong>Profile Verified : </strong> <span className={`${driverDetails.profilevalidate?'text-green-600':'text-red-600'}`}>{driverDetails.profilevalidate?"Verified":"Unverified"}</span></li>
                                        <li><strong>Email: </strong> <span >{driverDetails.email}</span></li>
                                        <li><strong>Phone Number : </strong> <span >{driverDetails.phonenumber}</span></li>
                                        <li><strong>Gender : </strong> <span >{driverDetails.gender}</span></li>
                                        <li><strong>Created At: </strong> <span >{selectedRequestDetails.createdAt.split("T")[0]} {selectedRequestDetails.createdAt.split("T")[1]}</span></li>
                                        <li><strong>DOB : </strong> <span >{driverDetails.dateOfBirth}</span></li>
                                        <li><strong className='text-blue-800'>Account holder name : </strong> <span ></span>{driverDetails.accountHolderName}</li>
                                        <li><strong className='text-blue-800'>Bank IFSC Code : </strong> <span ></span>{driverDetails.ifscCode}</li>
                                        <li><strong className='text-blue-800'>Account Number : </strong> <span ></span>{driverDetails.accountNumber}</li>
                                    </ul>

                                    <div className='flex flex-row gap-4 my-4 border-t py-4'>
                                        <div>
                                        <strong>Total Driver Balance : </strong> <span className='text-green-500'>{selectedRequestDetails.balance}</span>
                                        </div>
                                        <div>
                                        <strong>Total Withdral Request : </strong> <span className='text-green-500'>{selectedRequestDetails.request}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end p-4 border-t gap-2">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                onClick={handleConfirm}
                            >
                                Confirm Payment
                            </button>
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
            <div className="px-4 border-b-2 border-blue-100 bg-white">
                <h2 className="text-3xl py-4 font-semibold px-2">Withdral Requests</h2>
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
                            
                            {/* <th className="py-4 px-2 border-b-2 border-blue-200">Driver Name</th> */}
                            <th className="py-4 px-2 border-b-2 border-blue-200">Driver Phone Number</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Created Date</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Time</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Total Balance</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Withdrawl Amount</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((report, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-2 border-b-2 border-blue-200 text-center">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                                {/* <td className="py-2 border-b-2 border-blue-200 text-center">{report.driver || "Spiderman"}</td> */}
                                <td className="py-2 border-b-2 border-blue-200 text-center">{report.phonenumber}</td>
                                <td className="py-2 border-b-2 border-blue-200 text-center"><span>{report.createdAt.split("T")[0]} </span></td>
                                <td className="py-2 border-b-2 border-blue-200 text-center">{report.createdAt.split("T")[1].split(".")[0]}</td>
                                <td className="py-2 border-b-2 border-blue-200 text-center">₹{report.balance}</td>
                                <td className="py-2 border-b-2 border-blue-200 text-center">₹{report.request}</td>
                                <td className="py-2 border-b-2 border-blue-200 text-center">
                                <button className="text-blue-600 mx-1 font-semibold text-xl mr-4" onClick={() => handleViewDetails(report)}><BsFillEyeFill/></button>
                                    
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

export default WithdrawReport;
