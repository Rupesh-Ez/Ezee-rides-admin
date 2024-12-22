import React, { useEffect, useState } from "react";
import RegionDropdown from './RegionDropdown.jsx'
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import BACKEND_API_ENDPOINT from '../utils/constants.js'

const AddCouponForm = () => {
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    status: "Active",
    couponType: "All",
    region: "",
    service: "",
    usageLimit: "",
    startDate: "",
    endDate: "",
    discountType: "Fixed",
    discount: "",
    maxDiscount: "",
    minimumAmount: "",
    description: "",
  });
  const [regions, setRegions] = useState([]);
  const navigate = useNavigate();

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

  const [coupon, setCoupon] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);

    if (start > end) {
      alert('Start date must be before or equal to end date');
      return;
    }
    try {
      const submissionData = {
        ...formData,
        // Convert numeric fields to numbers, defaulting to 0 if empty
        usageLimit: formData.usageLimit ? Number(formData.usageLimit) : 0,
        discount: Number(formData.discount),
        maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : 0,
        minimumAmount: formData.minimumAmount ? Number(formData.minimumAmount) : 0
      };

      // Make API call
      const response = await axios.post(
        `${BACKEND_API_ENDPOINT}/api/coupon/savecoupon`,
        submissionData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );

      if (response.data.success) {
        // toast.success('Coupon created successfully!');
        alert(response.data.message)

        // Reset form
        setFormData({
          code: "",
          title: "",
          status: "Active",
          couponType: "All",
          region: "",
          service: "",
          usageLimit: "",
          startDate: "",
          endDate: "",
          discountType: "Fixed",
          discount: "",
          maxDiscount: "",
          minimumAmount: "",
          description: "",
        });

        navigate('/coupon');
      }
    } catch (error) {
      // Handle specific error responses
      if (error.response) {
        alert(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        // The request was made but no response was received
        alert('No response received from server');
      } else {
        error('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="py-8 px-4 bg-[#f7f9ff]">
      <form onSubmit={handleSubmit} className="bg-white rounded shadow-sm space-y-4">
        <div className="px-4 border-b-2 border-blue-100 bg-white">
          <h2 className="text-3xl py-4 font-semibold px-2">Add Coupon</h2>
        </div>
        <div className="grid grid-cols-3 gap-6 p-6">
          {/* Code */}
          <div className="flex flex-col">
            <label className="font-medium">
              Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Code"
              className="border border-gray-300 rounded p-2"
              required
            />
          </div>

          {/* Title */}
          <div className="flex flex-col">
            <label className="font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="border border-gray-300 rounded p-2"
              required
            />
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <label className="font-medium">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Coupon Type */}
          <div className="flex flex-col">
            <label className="font-medium">
              Coupon Type <span className="text-red-500">*</span>
            </label>
            <select
              name="couponType"
              value={formData.couponType}
              onChange={(e) => {
                handleChange(e);
                setCoupon(e.target.value);
              }}
              className="border border-gray-300 rounded p-2"
            >
              <option value="All">All</option>
              <option value="First">First Ride</option>
              <option value="Region">Region wise</option>
              <option value="Service">Service wise</option>
            </select>
          </div>

          {coupon === "Region" && (
            <RegionDropdown
              formData={formData}
              setFormData={setFormData}
              regions={regions}
            />
          )}

          {coupon === "Service" && (
            <div className="flex flex-col">
              <label className="font-medium">
                Service Type <span className="text-red-500">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2"
              >
                <option value="">Select service</option>
                <option value="Premium">Premium</option>
                <option value="Prime">Prime</option>
                <option value="Economic">Economic</option>
                <option value="Standard">Standard</option>
              </select>
            </div>
          )}

          {/* Usage Limit */}
          <div className="flex flex-col">
            <label className="font-medium">Usage Limit per Customer</label>
            <input
              type="number"
              name="usageLimit"
              value={formData.usageLimit}
              onChange={handleChange}
              placeholder="Usage limit per Rider"
              className="border border-gray-300 rounded p-2"
            />
          </div>

          {/* Start Date */}
          <div className="flex flex-col">
            <label className="font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
            />
          </div>

          {/* End Date */}
          <div className="flex flex-col">
            <label className="font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
            />
          </div>

          {/* Discount Type */}
          <div className="flex flex-col">
            <label className="font-medium">Discount Type</label>
            <select
              name="discountType"
              value={formData.discountType}
              onChange={handleChange}
              className="border border-gray-300 rounded p-2"
            >
              <option value="Fixed">Fixed</option>
              <option value="Percentage">Percentage</option>
            </select>
          </div>

          {/* Discount */}
          <div className="flex flex-col">
            <label className="font-medium">
              Discount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="Discount"
              className="border border-gray-300 rounded p-2"
              required
            />
          </div>

          {/* Maximum Discount */}
          <div className="flex flex-col">
            <label className="font-medium">
              Maximum Discount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="maxDiscount"
              value={formData.maxDiscount}
              onChange={handleChange}
              placeholder="Maximum Discount"
              className="border border-gray-300 rounded p-2"
              required
            />
          </div>

          {/* Minimum Amount */}
          <div className="flex flex-col">
            <label className="font-medium">
              Minimum Amount <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="minimumAmount"
              value={formData.minimumAmount}
              onChange={handleChange}
              placeholder="Minimum Amount"
              className="border border-gray-300 rounded p-2"
              required
            />
          </div>


          {/* Description */}
          <div className="flex flex-col">
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              rows="3"
              className="border border-gray-300 rounded p-2"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-green-500 text-white px-6 py-2 relative left-5 bottom-5 rounded hover:bg-green-600 transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default AddCouponForm;
