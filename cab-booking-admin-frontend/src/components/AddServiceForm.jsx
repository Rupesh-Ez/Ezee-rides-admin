import React, { useEffect, useState } from "react";
import axios from "axios";
import RegionDropdown from "./RegionDropdown";
import { useNavigate } from 'react-router-dom'
import BACKEND_API_ENDPOINT from '../utils/constants.js'

const AddServiceForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    regionId:"",
    baseFare: "",
    nightCharges: "",
    surgeCharges: "",
    minimumDistance: "",
    minimumFare: "",
    perDistance: "",
    perMinuteWait: "",
    adminCommission: "",
    waitingTimeLimit: "",
    commissionType: "Fixed",
    paymentMethod: "Cash",
    status: "Active",
    description: "",
  });

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
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post(`${BACKEND_API_ENDPOINT}/api/service/createservice`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        alert(res.data.message || "Service added Successfully ;)");
        navigate('/service')

      } else {
        alert(res.data.message || "failure");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="w-full py-8 px-4 bg-[#f7f9ff]">
      <form onSubmit={handleSubmit} className="my-4 mx-auto bg-white">
        <div className="px-4 border-b-2 border-blue-100 rounded">
          <h2 className="text-3xl py-4 font-semibold px-2">Add Service</h2>
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

          {/*Surge charges */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Surge Charges <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="surgeCharges"
              value={formData.surgeCharges}
              onChange={handleChange}
              placeholder="Surge Charges"
              className="w-full p-2 border rounded bg-[#f7f9ff]"
              required
            />
          </div>

          {/* Per Distance */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Per Distance <span className="text-red-500">*</span>
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


          {/* Waiting Time Limit */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Waiting Time Limit (in minutes){" "}
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
              <option value="Online/UPI">Online/UPI</option>
              <option value="Wallet">Wallet</option>
              <option value="Select All">Select All</option>
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
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="relative right-5 bottom-5 bg-green-500 hover:bg-green-600 transition-colors text-white py-2 px-4 rounded"
          >
            Save
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddServiceForm;