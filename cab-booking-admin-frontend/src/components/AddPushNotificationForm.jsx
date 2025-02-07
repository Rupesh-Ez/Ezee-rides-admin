import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import BACKEND_API_ENDPOINT from '../utils/constants.js'

const AddPushNotificationForm = () => {
    const [form, setForm] = useState({
        customer: false,
        driver: false,
        title: "",
        message: "",
        image: "",
        schedule: {
            enabled: false,
            details: {
                date: "",
                time: "",
                frequency: "",
            },
        },
    });

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: checked
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleScheduleChange = (key, value) => {
        setForm({
            ...form,
            schedule: {
                ...form.schedule,
                [key]: value,
            },
        });
    };

    const navigate = useNavigate();

    const handleScheduleDetailsChange = (key, value) => {
        setForm({
            ...form,
            schedule: {
                ...form.schedule,
                details: {
                    ...form.schedule.details,
                    [key]: value,
                },
            },
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Create a FormData object
            const formData = new FormData();

            // Append all form fields
            formData.append("customer", form.customer);
            formData.append("driver", form.driver);
            formData.append("title", form.title);
            formData.append("message", form.message);
            formData.append("image", form.image);
            formData.append("schedule", JSON.stringify(form.schedule)); // Stringify nested objects


            // Send the data using Axios
            const response = await axios.post(
                `${BACKEND_API_ENDPOINT}/api/pushnotification/create`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true,
                }
            );

            // Handle the response
            if (response.data.success) {
                alert(response.data.message);
                navigate('/pushnotification');
            }
        } catch (error) {
            console.error("Error in handleSubmit:", error);
            alert('An error occurred');
        }
    };


    return (
        <div className="bg-[#f7f9ff] p-6 pb-16">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-6">Add Push Notification</h2>
                <form className="space-y-4">
                    {/* Rider & Driver Selection */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="pl-2 flex items-center mt-2 font-semibold">
                                <input type="checkbox" className="mr-2 w-5 h-5 rounded" name="customer" checked={form.customer || false} onChange={handleCheckboxChange} /> Select Customers
                            </label>
                        </div>
                        <div>
                            <label className="pl-2 flex items-center mt-2 font-semibold">
                                <input type="checkbox" className="mr-5 w-5 h-5 rounded" name="driver" checked={form.driver || false} onChange={handleCheckboxChange} /> Select Drivers
                            </label>
                        </div>
                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={form.title}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-400"
                            />
                        </div>

                    </div>


                    {/* Schedule */}
                    <div>
                        <div>
                            <label className="text-md font-medium mb-1">
                                Schedule? <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="radio"
                                name="scheduleEnabled"
                                className="mx-2 w-4 h-4 align-middle"
                                checked={form.schedule.enabled === true}
                                onChange={() => handleScheduleChange("enabled", true)}
                            />{" "}
                            Yes
                            <input
                                type="radio"
                                name="scheduleEnabled"
                                className="mx-2 w-4 h-4 align-middle"
                                checked={form.schedule.enabled === false}
                                onChange={() => handleScheduleChange("enabled", false)}
                            />{" "}
                            No
                        </div>

                        {/* Schedule Details */}
                        <div
                            className={`transition-all duration-500 overflow-hidden ${form.schedule.enabled ? "max-h-[300px]" : "max-h-0"
                                }`}
                        >
                            <div className="mt-4 space-y-4 w-1/2 p-4 border-[1px] border-gray-200 rounded-md">
                                <div className="flex gap-2">
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium mb-1">
                                            Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={form.schedule.details.date}
                                            onChange={(e) =>
                                                handleScheduleDetailsChange("date", e.target.value)
                                            }
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-400"
                                        />
                                    </div>
                                    <div className="w-1/2">
                                        <label className="block text-sm font-medium mb-1">
                                            Time <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="time"
                                            name="time"
                                            value={form.schedule.details.time}
                                            onChange={(e) =>
                                                handleScheduleDetailsChange("time", e.target.value)
                                            }
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-400"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Frequency <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="frequency"
                                        value={form.schedule.details.frequency}
                                        onChange={(e) =>
                                            handleScheduleDetailsChange("frequency", e.target.value)
                                        }
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-400"
                                    >
                                        <option value="">Select Frequency</option>
                                        <option value="Once">Once</option>
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Add Image */}
                    <div className="flex gap-4 items-center">
                        <label htmlFor="image" className="text-sm font-medium text-gray-700">
                            Add Image URL
                        </label>
                        <input
                            type="text"
                            name="image"
                            id="image"
                            value={form.image}
                            onChange={handleInputChange}
                            className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-400"
                        />
                    </div>


                    {/* Message */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Message 
                        </label>
                        <textarea
                            name="message"
                            placeholder="Message"
                            value={form.message}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 outline-none focus:border-blue-400"
                        />
                    </div>

                    {/* Save Button */}
                    <div className="flex gap-2">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPushNotificationForm;
