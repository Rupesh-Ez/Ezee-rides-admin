import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import RegionDropdown from "./RegionDropdown";
import BACKEND_API_ENDPOINT from '../utils/constants.js'

const UpdateService = () => {
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        region: "",
        baseFare: "",
        nightCharges: "",
        minimumDistance: "",
        minimumFare: "",
        perDistance: "",
        perDistanceLarge: "",
        perMinuteWait: "",
        adminCommission: "",
        waitingTimeLimit: "",
        commissionType: "Fixed",
        paymentMethod: "Cash",
        status: "Active",
        description: "",
    });

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await axios.post(
                    `${BACKEND_API_ENDPOINT}/api/service/getservicebyid`,
                    { _id: id }, // Pass the data directly as the second argument
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    }
                );
                if (response.data.success) {

                    setFormData(prevFormData => ({
                        ...prevFormData,
                        ...response.data.data
                    }));

                } else {
                    alert('Failed to fetch service');
                }
            } catch (error) {
                alert('An error occurred while fetching service');
            }
        };

        fetchService();
    }, [id]);

    const [regions, setRegions] = useState([]);

    useEffect(() => {
        // Fetch regions from the backend
        const fetchRegions = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/region/getregioncity`);
                if (response.data.success) {
                    setRegions(response.data.data);
                } else {
                    console.error("Failed to fetch regions");
                }
            } catch (error) {
                console.error("Error fetching regions:", error);
            }
        };

        fetchRegions();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_API_ENDPOINT}/api/service/updateservice/${id}`, formData, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });
            if (res.data.success) {
                alert(res.data.message || "Service updated Successfully ;)");
                navigate("/service")
            } else {
                alert(res.data.message || "failure");
            }
        } catch (error) {
            alert(error.response?.data?.message || "An unexpected error occurred");
        }
    };

    return (
        <div className="flex overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />


                <div className="w-full py-8 px-4 bg-[#f7f9ff]">
                    <form onSubmit={handleSubmit} className="my-4 mx-auto bg-white">
                        <div className="px-4 border-b-2 border-blue-100 rounded">
                            <h2 className="text-3xl py-4 font-semibold px-2">Update Service</h2>
                        </div>
                        <div className="grid grid-cols-3 gap-4 bg-white p-4">
                            {/* Name Field */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            {/* Region Field */}
                            <RegionDropdown
                                formData={formData}
                                setFormData={setFormData}
                                regions={regions}
                            />

                            {/* Base Fare Field */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Base Fare <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="baseFare"
                                    value={formData.baseFare}
                                    onChange={handleChange}
                                    placeholder="Base Fare"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            {/* Minimum Distance */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Minimum Distance <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="minimumDistance"
                                    value={formData.minimumDistance}
                                    onChange={handleChange}
                                    placeholder="Minimum Distance"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            {/* Minimum Fare */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Minimum Fare <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="minimumFare"
                                    value={formData.minimumFare}
                                    onChange={handleChange}
                                    placeholder="Minimum Fare"
                                    className="w-full p-2 border rounded bg-[#f7f9ff]"
                                    required
                                />
                            </div>

                            {/*Night charges */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Night Charges <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="nightCharges"
                                    value={formData.nightCharges}
                                    onChange={handleChange}
                                    placeholder="Night Charges"
                                    className="w-full p-2 border rounded bg-[#f7f9ff]"
                                    required
                                />
                            </div>

                            {/* Per Distance */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Per Distance (Upto 3 km) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="perDistance"
                                    value={formData.perDistance}
                                    onChange={handleChange}
                                    placeholder="Per Distance"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Per Distance (More than 3 km) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="perDistanceLarge"
                                    value={formData.perDistanceLarge}
                                    onChange={handleChange}
                                    placeholder="Per Distance"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            {/* Per Minute Wait */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Per Minute Wait
                                </label>
                                <input
                                    type="number"
                                    name="perMinuteWait"
                                    value={formData.perMinuteWait}
                                    onChange={handleChange}
                                    placeholder="Per Minute Wait"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            {/* Admin Commission */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Admin Commission <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="adminCommission"
                                    value={formData.adminCommission}
                                    onChange={handleChange}
                                    placeholder="Admin Commission"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            {/* Waiting Time Limit */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Waiting Time Limit (in minutes){" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="waitingTimeLimit"
                                    value={formData.waitingTimeLimit}
                                    onChange={handleChange}
                                    placeholder="Waiting Time Limit"
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>

                            {/* Commission Type */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Commission Type <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="commissionType"
                                    value={formData.commissionType}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="Fixed">Fixed</option>
                                    <option value="Percentage">Percentage</option>
                                </select>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Payment Method <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="Cash">Cash</option>
                                    <option value="Online">Online/UPI</option>
                                    <option value="Wallet">Wallet</option>
                                    <option value="All">Select All</option>
                                </select>
                            </div>

                            {/* Status */}
                            <div>
                                <label className="block text-sm font-medium mb-1">Status <span className="text-red-500">*</span></label>
                                <select
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded"
                                    required
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            {/* Description */}
                            <div className="col-span-2">
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    className="w-full p-2 border rounded bg-[#f7f9ff]"
                                    rows="4"
                                ></textarea>
                            </div>

                        </div>
                        <div className="flex gap-3 justify-end mx-6">
                            <button
                                type="button"
                                className="bg-red-500 text-white px-6 py-2 relative left-5 bottom-5 rounded hover:bg-red-600 transition-colors"
                                onClick={() => {
                                    navigate("/service")
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-green-500 text-white px-6 py-2 relative left-5 bottom-5 rounded hover:bg-green-600 transition-colors"
                            >
                                Save
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateService;