import React, { useState, useEffect } from 'react';
import { IoSend } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios'
import BACKEND_API_ENDPOINT from '../utils/constants.js'

const PushNotificationList = () => {
    // Sample data
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/pushnotification/getallnotification`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                if (response.data.success) {
                    setNotifications(response.data.data);

                } else {
                    alert('Failed to fetch notifications');
                }
            } catch (error) {
                alert('An error occurred while fetching notifications');
            }
        };

        fetchNotifications();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedNotificationDetails, setSelectedNotificationDetails] = useState({});
    const [users, setUsers] = useState(notifications);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [displayedUsers, setDisplayedUsers] = useState([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openConfirm = () => setIsConfirmOpen(true);
    const closeConfirm = () => setIsConfirmOpen(false);

    const openDelete = () => setIsDeleteOpen(true);
    const closeDelete = () => setIsDeleteOpen(false);

    const handleDelete = async (e) => {
        try {
            const response = await axios.delete(`${BACKEND_API_ENDPOINT}/api/pushnotification/delete`, {
                data: { _id: selectedNotificationDetails._id },
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (response.data.success) {
                setNotifications(prevNotificatoins =>
                    prevNotificatoins.filter(notificaiton => notificaiton._id !== selectedNotificationDetails._id)
                );
            } else {
                alert('Failed to fetch notificaiton');
            }
        } catch (error) {
            alert('An error occurred while fetching notificaiton');
        } finally {
            closeDelete();
        }
    }
    const initiateNotifiaction = async (e) => {
        try {

            const response = await axios.post(`${BACKEND_API_ENDPOINT}/api/pushnotification/update/${selectedNotificationDetails._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (response.data.success) {
                alert("Notification initiated successfully");
            } else {
                alert('Failed to initiate notificaiton');
            }
        } catch (error) {
            alert('An error occurred while fetching notificaiton');
        } finally {
            closeConfirm();
        }
    }

    useEffect(() => {
        setUsers(notifications);
        const startIdx = (currentPage - 1) * entriesPerPage;
        const endIdx = startIdx + entriesPerPage;
        setDisplayedUsers(users.slice(startIdx, endIdx));
    }, [users, currentPage, entriesPerPage, notifications]);

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
                        className="bg-white rounded shadow-lg absolute top-5 w-1/3"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal header */}
                        <div className="flex justify-between items-center border-b px-4 py-2">
                            <h2 className="text-xl font-bold">Notification Details</h2>
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
                                    <ul className="space-y-1 mt-2 grid grid-cols-2">
                                        <li><strong>Title:</strong> {selectedNotificationDetails.title}</li>
                                        <li><strong>Notification For:</strong> {(selectedNotificationDetails.customer && selectedNotificationDetails.driver) ? "Both" : (selectedNotificationDetails.driver) ? "Driver" : "Customer"}</li>
                                        <li><strong>Created Date:</strong> {selectedNotificationDetails.createdAt.split('T')[0]}</li>
                                        <li><strong>Scheduled Date:</strong> {(selectedNotificationDetails.schedule.enabled) ? `${selectedNotificationDetails.schedule.details.date.split('T')[0]}` : "not scheduled"}</li>
                                        <li><strong>Is Scheduled:</strong> {(selectedNotificationDetails.schedule.enabled) ? 'True' : 'False'}</li>
                                        <li><strong>frequency:</strong> {(selectedNotificationDetails.schedule.enabled) ? selectedNotificationDetails.schedule.details.frequency : "N/A"}</li>
                                        <li><strong>Message:</strong> <div className='ml-2 text-gray-400'>'{selectedNotificationDetails.message}'</div></li>
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

            {isConfirmOpen && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
                    onClick={closeConfirm} // Close on clicking the background
                >
                    {/* Modal content */}
                    <div
                        className="bg-white rounded shadow-lg absolute top-auto"
                        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent modal from closing
                    >
                        {/* Modal header */}
                        <div className="flex justify-between items-center border-b px-4 py-2">
                            <h2 className="text-xl font-bold">Do You want to Send this Notificaiton ?</h2>
                            <button
                                className="text-gray-600 hover:text-red-500 text-2xl ml-4"
                                onClick={closeConfirm}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="flex justify-end p-4 border-t gap-2">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={initiateNotifiaction}
                            >
                                Send
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={closeConfirm}
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {isDeleteOpen && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
                    onClick={closeDelete} // Close on clicking the background
                >
                    {/* Modal content */}
                    <div
                        className="bg-white rounded shadow-lg absolute top-auto"
                        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent modal from closing
                    >
                        {/* Modal header */}
                        <div className="flex justify-between items-center border-b px-4 py-2">
                            <h2 className="text-xl font-bold">Do You want to Delete {selectedNotificationDetails.title} ?</h2>
                            <button
                                className="text-gray-600 hover:text-red-500 text-2xl ml-4"
                                onClick={closeDelete}
                            >
                                &times;
                            </button>
                        </div>

                        <div className="flex justify-end p-4 border-t gap-2">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={closeDelete}
                            >
                                Close
                            </button>
                        </div>

                    </div>
                </div>
            )}

            <div className="flex justify-between px-4 border-b-2 border-blue-100 bg-white">
                <h2 className="text-3xl py-4 font-semibold px-2">Push Notification List</h2>
                <Link to='/pushnotification/create' className="border border-black bg-white text-xl text-black hover:bg-black hover:text-white rounded-md my-3 flex items-center p-2"> + Add Push Notification</Link>
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
                            <th className="py-6 px-2 border-b-2 border-blue-200">Title</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Message</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Notification For</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Date Created</th>
                            <th className="py-6 px-2 border-b-2 border-blue-200">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((Notification, index) => (
                            <tr key={index} className="hover:bg-gray-50 text-center">
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{Notification.title}</td>
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{Notification.message.length > 30
                                    ? Notification.message.slice(0, 30) + "...."
                                    : Notification.message}</td>
                                <td className={`px-2 py-4 border-b-2 border-blue-200 ${(Notification.curtomer && Notification.driver) ? 'text-cyan-400' : Notification.customer ? 'text-gray-500' : 'text-blue-500'}`}>{(Notification.customer && Notification.driver) ? "Both" : (Notification.driver) ? "Driver" : "Customer"}</td>
                                <td className="px-2 py-4 border-b-2 border-blue-200 ">{Notification.createdAt}</td>

                                <td className="px-2 py-4 border-b-2 border-blue-200 ">
                                    <button className="text-blue-600 mx-1" onClick={() => {
                                        setSelectedNotificationDetails(Notification);
                                        openConfirm();
                                    }}><IoSend /></button>
                                    <button onClick={() => {
                                        setSelectedNotificationDetails(Notification);
                                        openModal();
                                    }} className="text-blue-600 mx-1 text-xl">👁️</button>
                                    <button
                                        onClick={() => {
                                            setSelectedNotificationDetails(Notification);
                                            openDelete();
                                        }}
                                        className="text-red-600 mx-1 text-xl"><MdDelete /></button>
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

export default PushNotificationList;
