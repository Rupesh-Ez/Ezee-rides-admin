import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdDelete } from 'react-icons/md';
import { Link } from 'react-router-dom'
import BACKEND_API_ENDPOINT from '../utils/constants';

const DealsList = () => {
    const [Deals, setDeals] = useState([]);
    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/deals/get-all-deals`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                if (response.data.success) {
                    setDeals(response.data.data);
                } else {
                    alert('Failed to fetch regions');
                }
            } catch (error) {
                console.error('Error fetching Deals:', error);
                alert('An error occurred while fetching Deals');
            }
        };

        fetchDeals();
    }, []);

    const handleDelete = async (deal) => {
        try {
            const response = await axios.delete(`${BACKEND_API_ENDPOINT}/api/deals/delete`, {
                data: { _id: deal._id },
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            if (response.data.success) {
                setDeals(prevDeals =>
                    prevDeals.filter(deals => deals._id !== deal._id)
                );
            } else {
                alert('Failed to fetch Deals');
            }
        } catch (error) {
            console.error('Error Deleting Deals:', error);
            alert('An error occurred while Deleting Deals');
        }
    }
    return (
        <div className="p-4 bg-[#f7f9ff]">
            <div className="flex justify-between px-4 border-b-2 border-blue-100 bg-white">
                <h2 className="text-3xl py-4 font-semibold px-2">Deals For Customers</h2>
                <Link to='/deals/add-deal' className="border border-black bg-white text-xl text-black hover:bg-black hover:text-white rounded-md my-3 flex items-center p-2"> + Add Deal</Link>
            </div>
            <div className='bg-white py-4 px-2'>
                <table className="w-full border-collapse border border-blue-200">
                    <thead>
                        <tr className="">
                            <th className="py-4 px-2 border-b-2 border-blue-200">No</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Title</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Created At</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Updated At</th>
                            <th className="py-4 px-2 border-b-2 border-blue-200">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Deals.map((deal, index) => (
                            <tr key={deal._id} className="hover:bg-gray-50 text-center">
                                <td className="p-2 border-b-2 border-blue-200">{index + 1}</td>
                                <td className="p-2 border-b-2 border-blue-200">{deal?.title}</td>
                                <td className="p-2 border-b-2 border-blue-200">{deal?.createdAt}</td>
                                <td className="p-2 border-b-2 border-blue-200">{deal?.updatedAt}</td>
                                <td className="p-2 border-b-2 border-blue-200">

                                    <button className="text-red-600 mx-1 text-xl" onClick={() => {
                                        handleDelete(deal)
                                    }}><MdDelete /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default DealsList