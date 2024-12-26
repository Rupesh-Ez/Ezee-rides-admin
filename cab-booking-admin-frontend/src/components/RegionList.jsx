import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';
import axios from 'axios'
import ToogleButton from './ToogleButton.jsx';
import BACKEND_API_ENDPOINT from '../utils/constants.js'

const RegionList = () => {

    const [regions, setRegions] = useState([]);
    useEffect(() => {
        const fetchRegions = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/region/getallregions`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                if (response.data.success) {

                    setRegions(response.data.data);

                } else {
                    alert('Failed to fetch regions');
                }
            } catch (error) {
                console.error('Error fetching regions:', error);
                alert('An error occurred while fetching regions');
            } finally {
                setLoading(false);
            }
        };

        fetchRegions();
    }, []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [confirmText, setConfirmText] = useState("");
    const [selectedRegionDetails, setSelectedRegionDetails] = useState({});
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [displayedUsers, setDisplayedUsers] = useState([]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const openConfirm = () => setIsConfirmOpen(true);
    const closeConfirm = () => {
        setConfirmText("");
        setIsConfirmOpen(false)
    };

    useEffect(() => {
        setUsers(regions);
    }, [regions]);

    const handleConfirm = async (e) => {
        try {
            const response = await axios.delete(`${BACKEND_API_ENDPOINT}/api/region/deleteregion`, {
                data: { _id: selectedRegionDetails._id },
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (response.data.success) {
                setRegions(prevRegions =>
                    prevRegions.filter(region => region._id !== selectedRegionDetails._id)
                );
            } else {
                alert('Failed to fetch regions');
            }
        } catch (error) {
            alert('An error occurred while fetching regions');
        } finally {
            closeConfirm();
        }
    }

    const handleRegionStatusChange = async (regionId, newStatus) => {

        try {
            const response = await axios.post(`${BACKEND_API_ENDPOINT}/api/region/update/${regionId}`, { Status: newStatus }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (response.data.success) {
                setRegions((prevUsers) =>
                    prevUsers.map((user) => (user._id === regionId ? { ...user, status: (newStatus) ? "Active" : "Inactive" } : user))
                );
                setSelectedRegionDetails({});

            } else {
                alert('Failed to update region status');
            }
        } catch (error) {
            alert('An error occurred while updating the region status');
            console.error(error);
        }
    };

    useEffect(() => {
        const startIdx = (currentPage - 1) * entriesPerPage;
        const endIdx = startIdx + entriesPerPage;
        setDisplayedUsers(users.slice(startIdx, endIdx));
    }, [users, currentPage, entriesPerPage]);

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
            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
                    onClick={closeModal} // Close on clicking the background
                >
                    {/* Modal content */}
                    <div
                        className="bg-white rounded shadow-lg absolute top-5 w-1/2"
                        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent modal from closing
                    >
                        {/* Modal header */}
                        <div className="flex justify-between items-center border-b px-4 py-2">
                            <h2 className="text-xl font-bold">Region Details</h2>
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
                                        <li><strong>ID:</strong> {selectedRegionDetails._id}</li>
                                        <li><strong>Name:</strong> {selectedRegionDetails.city}</li>
                                        <li><strong>Distance Unit:</strong> {selectedRegionDetails.distance}</li>
                                        <li><strong>Timezone:</strong> {selectedRegionDetails.timezone}</li>
                                        <li><strong>Status:</strong> {selectedRegionDetails.status}</li>
                                        <li><strong>Created At:</strong> {selectedRegionDetails.createdAt}</li>
                                    </ul>
                                </div>
                                <div><p className='text-xl text-gray-400 mb-2'>Coordinates:</p> {selectedRegionDetails.coordinates.map((coordinate, index) => (
                                    <div key={index} className='font-light'>
                                        <p>Latitude: {coordinate.lat}  <span className='mx-4'>:</span>Longitude: {coordinate.lng}</p>
                                    </div>
                                ))}</div>

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
                        className="bg-white rounded shadow-lg absolute top-auto p-2"
                        onClick={(e) => e.stopPropagation()} // Stop propagation to prevent modal from closing
                    >
                        {/* Modal header */}
                        <div className="flex justify-between items-center border-b px-4 py-2">
                            <h2 className="text-xl font-bold">Confirm <span className='text-gray-400 font-semibold'>Delete {selectedRegionDetails.city} ? </span></h2>
                            <button
                                className="text-gray-600 hover:text-red-500 text-2xl ml-4"
                                onClick={closeConfirm}
                            >
                                &times;
                            </button>
                        </div>

                        <div className='flex mx-4 flex-col gap-3 p-2'>
                            <label className='block font-semibold text-gray-400'> Write <span className='text-red-500 font-semibold'>Delete</span> to proceed </label>
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
                                className={` text-white px-4 py-2 rounded ${(confirmText !== 'Delete') ? 'bg-red-200' : 'bg-red-500 hover:bg-red-600'}`}
                                onClick={handleConfirm}
                                disabled={confirmText !== 'Delete'}
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
                <h2 className="text-3xl py-4 font-semibold px-2">Regions List</h2>
                <Link to='/region/create' className="border border-black bg-white text-xl text-black hover:bg-black hover:text-white rounded-md my-3 flex items-center p-2"> + Add Region</Link>
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
                            <th className="py-4 px-2 border-b-2 border-blue-200">Name</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Distance Unit</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Timezone</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Created At</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Status</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((region, index) => (
                            <tr key={region._id} className="hover:bg-gray-50 py-4">
                                <td className="p-2 border-b-2 border-blue-200 text-center">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                                <td className="p-2 border-b-2 border-blue-200 text-center">{region.city}</td>
                                <td className="p-2 border-b-2 border-blue-200 text-center">{region.distance}</td>
                                <td className="p-2 border-b-2 border-blue-200 text-center">{region.timezone}</td>
                                <td className="p-2 border-b-2 border-blue-200 text-center">{new Date(region.createdAt).toLocaleString()}</td>
                                <td className="p-2 border-b-2 border-blue-200 text-center">
                                    <ToogleButton initialState={region.status} onToggle={(newState) => handleRegionStatusChange(region._id, newState)} />
                                </td>
                                <td className="p-2 border-b-2 border-blue-200 text-center">
                                    <Link to={`/region/update/${region._id}`}>
                                        <button className="text-blue-600 mx-1 text-xl"><FaRegEdit /></button>
                                    </Link>
                                    <button onClick={() => {
                                        setSelectedRegionDetails(region);
                                        openModal();
                                    }} className="text-blue-600 mx-1 text-xl">👁️</button>
                                    <button className="text-red-600 mx-1 text-xl" onClick={() => {
                                        setSelectedRegionDetails(region);
                                        openConfirm();
                                    }} ><MdDelete /></button>
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

export default RegionList;
