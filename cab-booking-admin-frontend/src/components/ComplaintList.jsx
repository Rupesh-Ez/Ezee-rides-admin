import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
// import axios from 'axios'
// import BACKEND_API_ENDPOINT from '../utils/constants.js'

const ComplaintList = ({ status }) => {
    // const [filteredComplaints, setFilteredComplaints] = useState([]);
    // Sample data
    const complaints = [
        { id: 11, rideRequest: '144', driver: 'Hari Om Mishra', user: 'Spiderman', complaintBy: 'user', subject: 'Not happy', createdDate: 'October 10, 2024 6:16 AM', Status: 'resolved' },
        { id: 12, rideRequest: '21', driver: 'Hari Om Mishra', user: 'Spiderman', complaintBy: 'user', subject: 'Not happy', createdDate: 'October 10, 2024 6:16 AM', Status: 'resolved' },
        { id: 13, rideRequest: '244', driver: 'Hari Om Mishra', user: 'Spiderman', complaintBy: 'user', subject: 'uda diya', createdDate: 'October 10, 2024 6:16 AM', Status: 'pending' },
        { id: 14, rideRequest: '55', driver: 'Hari Om Mishra', user: 'Spiderman', complaintBy: 'driver', subject: 'out of webshooters', createdDate: 'October 10, 2024 6:16 AM', Status: 'pending' },
        { id: 15, rideRequest: '66', driver: 'Hari Om Mishra', user: 'Spiderman', complaintBy: 'driver', subject: 'gadha h', createdDate: 'October 10, 2024 6:16 AM', Status: 'resolved' },
        { id: 16, rideRequest: '33', driver: 'Hari Om Mishra', user: 'Spiderman', complaintBy: 'user', subject: 'Not happy', createdDate: 'October 10, 2024 6:16 AM', Status: 'pending' },
        { id: 17, rideRequest: '12', driver: 'Hari Om Mishra', user: 'Spiderman', complaintBy: 'user', subject: 'Not happy', createdDate: 'October 10, 2024 6:16 AM', Status: 'resolved' },
        { id: 18, rideRequest: '11', driver: 'Hari Om Mishra', user: 'Spiderman', complaintBy: 'driver', subject: 'Not happy', createdDate: 'October 10, 2024 6:16 AM', Status: 'investigation' },
        { id: 19, rideRequest: '09', driver: 'Hari Om Mishra', user: 'Spiderman', complaintBy: 'user', subject: 'hahaha', createdDate: 'October 10, 2024 6:16 AM', Status: 'investigation' },
        { id: 20, rideRequest: '15', driver: 'Hari Om Mishra', user: 'Spiderman', complaintBy: 'user', subject: 'Not happy', createdDate: 'October 10, 2024 6:16 AM', Status: 'resolved' },
        { id: 21, rideRequest: '78', driver: 'Hari Om Mishra', user: 'Spiderman', complaintBy: 'user', subject: 'Not happy', createdDate: 'October 10, 2024 6:16 AM', Status: 'resolved' },

    ];

    // const [complaints,setComplaints] = useState([]);

    // useEffect(() => {
    //     const fetchComplaints = async () => {
    //         try {
    //             const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/complaint/getallcomplaint`, {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 withCredentials: true,
    //             });
    //             if (response.data.success) {

    //                 setComplaints(response.data.data);

    //             } else {
    //                 alert('Failed to fetch complaint');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching complaint:', error);
    //             alert('An error occurred while fetching complaint');
    //         }
    //     };

    //     fetchComplaints();
    // }, []);

    const [selectedComplaintDetails, setSelectedComplaintDetails] = useState({});
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const openConfirm = () => setIsConfirmOpen(true);
    const closeConfirm = () => setIsConfirmOpen(false);

    useEffect(() => {
        const filtered = complaints.filter((complaint) => complaint.Status === status);
        // setFilteredComplaints(filtered);
        setUsers(filtered);
        setCurrentPage(1);
    }, [status,complaints]);

    const [users, setUsers] = useState(complaints);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [displayedUsers, setDisplayedUsers] = useState([]);

    const handleConfirm = async (e) => {

        // try {
        //     const response = await axios.delete(`${BACKEND_API_ENDPOINT}/api/complaint/deletecomplaint`, {
        //         data: { _id: selectedComplaintDetails._id },
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         withCredentials: true,
        //     });
        //     if (response.data.success) {
        //         setComplaints(prevComplaints => 
        //             prevComplaints.filter(complaint => complaint._id !== selectedComplaintDetails._id)
        //         );
        //     } else {
        //         alert('Failed to fetch complaint');
        //     }
        // }catch (error) {
        //     alert('An error occurred while fetching complaint');
        // } 
        closeConfirm();
    }

    useEffect(() => {
        // setUsers(coupons);
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
                        className="bg-white rounded shadow-lg w-1/4 absolute top-auto p-2"
                        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent modal from closing
                    >
                        {/* Modal header */}
                        <div className="flex justify-between items-center border-b px-4 py-2">
                            <h2 className="text-xl font-bold">Confirm <span className='text-gray-400 font-semibold'>Delete {selectedComplaintDetails.id} ? </span></h2>
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
                <h2 className="text-3xl py-4 font-semibold px-2"> Complaints {status} list</h2>
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
                            <th className="py-6 px-2 border-b-2 border-blue-200">Ride Request</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Driver</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">User</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Complaint by</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Subject</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Date Created</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Status</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((Complaint, index) => (
                            <tr key={Complaint.id} className="hover:bg-gray-50 text-center">
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{Complaint.rideRequest}</td>
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{Complaint.driver}</td>
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{Complaint.user}</td>
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{Complaint.complaintBy}</td>
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{Complaint.subject}</td>
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{Complaint.createdDate}</td>

                                <td className={`px-2 py-4 border-b-2 border-blue-200 ${Complaint.Status === 'pending' ? 'text-red-500' : Complaint.Status === 'investigation' ? 'text-blue-500' : 'text-green-500'}`}>{Complaint.Status}</td>

                                <td className="px-2 py-4 border-b-2 border-blue-200 ">
                                    <Link to={`/complaints/update/${Complaint.id}`}>{/*update id =_id */}
                                        <button className="text-blue-600 mx-1 text-xl"><FaRegEdit /></button>
                                    </Link>
                                    <button className="text-red-600 mx-1 text-xl" onClick={() => {
                                        setSelectedComplaintDetails(Complaint);
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

export default ComplaintList;
