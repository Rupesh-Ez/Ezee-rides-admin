import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BACKEND_API_ENDPOINT from '../utils/constants';

const AddDealsPage = () => {
    const [formData, setFormData] = useState({
        title: "",
        image: "",
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${BACKEND_API_ENDPOINT}/api/deals/addDeal`,
                formData, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true
                }
            );

            if (response.data.success) {
                alert(response.data.message || "Deal added Successfully!!");
                navigate('/deals/deal-list');
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message || 'An error occurred');
            } else if (error.request) {
                alert('No response received from server');
            } else {
                console.error('Error: ' + error.message);
            }
        }
    };


    return (
        <div className="flex overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="py-8 px-4 bg-[#f7f9ff]">
                    <form onSubmit={handleSubmit} className="bg-white rounded shadow-sm space-y-4">
                        <div className="px-4 border-b-2 border-blue-100 bg-white">
                            <h2 className="text-3xl py-4 font-semibold px-2">Add Deals Form</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-6 p-6">
                            <div className="flex flex-col">
                                <label className="font-medium">
                                    Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="title"
                                    className="border border-gray-300 rounded p-2"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-medium">
                                    Deal Image Url<span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded p-2"
                                    required
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-green-500 text-white px-6 py-2 relative left-5 bottom-5 rounded hover:bg-green-600 transition-colors"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddDealsPage