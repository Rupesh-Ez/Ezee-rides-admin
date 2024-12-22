import React, { useState, useEffect } from 'react';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from 'react-router-dom';

const RoleList = () => {
    // Sample data
    const roles = [
        { id: 1, role: 'Driver' },
        { id: 2, role: 'Customer' },
        { id: 3, role: 'You' },

    ];

    const [roleDialog, SetRoleDialog] = useState(false);
    const [roleName, setRoleName] = useState("");
    const [users, setUsers] = useState(roles);
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

    const openRoleDialog = () => SetRoleDialog(true);
    const closeRoleDialog = () => SetRoleDialog(false);

    const addRole = () =>{
        closeRoleDialog();
    }

    return (
        <div className="p-6 bg-[#f7f9ff]">
            <div className="flex justify-between px-4 border-b-2 border-blue-100 bg-white">
                <h2 className="text-3xl py-4 font-semibold px-2">Role List <span className='text-gray-500 text-xl'>(This component is not Functional but Reserved for Future use)</span></h2>
                <button onClick={openRoleDialog} className="border border-black bg-white text-xl text-black hover:bg-black hover:text-white rounded-md my-3 flex items-center p-2"> + Add Role</button>

                 {/* Modal */}
                 {roleDialog && (
                        <div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
                            onClick={closeRoleDialog} // Close on clicking the background
                        >
                            {/* Modal content */}
                            <div
                                className={`bg-white rounded shadow-lg w-96 absolute top-5
                                    }`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal header */}
                                <div className="flex justify-between items-center border-b px-4 py-2">
                                    <h2 className="text-lg font-bold">Add Role</h2>
                                    <button
                                        className="text-gray-600 hover:text-red-500 text-2xl"
                                        onClick={closeRoleDialog}
                                    >
                                        &times;
                                    </button>
                                </div>

                                {/* Modal body */}
                                <div className="p-4">
                                    <div className="mb-4">
                                        <label className="block font-medium text-gray-700">
                                            Role Name
                                        </label>
                                        <input
                                            type="text"
                                            value={roleName}
                                            onChange={(e) => setRoleName(e.target.value)}
                                            className="mt-1 p-2 block w-full border rounded shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    
                                </div>

                                {/* Modal footer */}
                                <div className="flex justify-end p-4 border-t">
                                    <button
                                        type='submit'
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        onClick={addRole}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
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
                            <th className="py-4 px-2 border-b-2 border-blue-200">Role</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedUsers.map((region, index) => (
                            <tr key={region.id} className="hover:bg-gray-50">
                                <td className="p-2 border-b-2 border-blue-200 text-center">{(currentPage - 1) * entriesPerPage + index + 1}</td>
                                <td className="p-2 border-b-2 border-blue-200 text-center">{region.role}</td>
                                
                                <td className="p-2 border-b-2 border-blue-200 text-center">
                                    <button className="text-red-600 mx-1 text-xl"><MdDelete /></button>
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

export default RoleList;
