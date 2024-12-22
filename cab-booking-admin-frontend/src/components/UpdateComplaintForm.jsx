import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import BACKEND_API_ENDPOINT from '../utils/constants.js'

const UpdateComplaintForm = ({id}) => {
  
  const [formData, setFormData] = useState({
    subject: "Rude Behaviour",
    rideRequest: "#97",
    rider: "Nena Autocar",
    complaintBy: "Rider",
    status: "Pending",
    driver: "",
    description: "",
  });
  const navigate = useNavigate();
//   useEffect(() => {
//     const fetchComplaint = async () => {
               
//         try {
//             const response = await axios.post(
//                 `${BACKEND_API_ENDPOINT}/api/complaint/getcomplaintbyid`,
//                 { _id: id },
//                 {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     withCredentials: true,
//                 }
//             );
//             if (response.data.success) {
            
//                 setFormData(prevFormData => ({
//                     ...prevFormData,
//                     ...response.data.data
//                 }));
                

//             } else {
//                 alert('Failed to fetch complaint');
//             }
//         } catch (error) {
//             alert('An error occurred while fetching complaint');
//         }
//     };

//     fetchComplaint();
// }, [id]);

const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    //     const res = await axios.post(`${BACKEND_API_ENDPOINT}/api/complaint/updatecomplaint/${id}`, formData, {
    //         headers: { "Content-Type": "application/json" },
    //         withCredentials: true,
    //     });
    //     if (res.data.success) {
    //         alert(res.data.message || "complaint updated Successfully ;)");
    //         navigate("/complaints/resolved")
    //     } else {
    //         alert(res.data.message || "failure");
    //     }
    // } catch (error) {
    //     alert(error.response?.data?.message || "An unexpected error occurred");
    // }
    navigate("/complaints/resolved");
};


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="py-8 px-4 bg-[#f7f9ff]">
      <form onSubmit={handleSubmit} className="bg-white rounded shadow-sm space-y-4">
    <div className="px-4 border-b-2 border-blue-100 bg-white">
          <h2 className="text-3xl py-4 font-semibold px-2">Update Complaint</h2>
        </div>
        <div className="grid grid-cols-3 gap-6 p-6">
        {/* Subject Field */}
        <div>
          <label className="block font-medium mb-1">Subject *</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Ride Request Field */}
        <div>
          <label className="block font-medium mb-1">Ride Request</label>
          <input
            type="text"
            name="rideRequest"
            value={formData.rideRequest}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Rider Field */}
        <div>
          <label className="block font-medium mb-1">Customer</label>
          <input
            type="text"
            name="rider"
            value={formData.rider}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Complaint By Field */}
        <div>
          <label className="block font-medium mb-1">Complaint By *</label>
          <select
            name="complaintBy"
            value={formData.complaintBy}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="Rider">Customer</option>
            <option value="Driver">Driver</option>
          </select>
        </div>

        {/* Driver Field */}
        <div>
          <label className="block font-medium mb-1">Driver</label>
          <input
            type="text"
            name="driver"
            value={formData.driver}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Status Field */}
        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Resolved">Resolved</option>
            <option value="Investigating">Investigating</option>
          </select>
        </div>

        {/* Description Field */}
        <div className="col-span-2">
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="4"
          ></textarea>
        </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-2 m-4">
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={()=>{
                navigate("/complaints/resolved");
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateComplaintForm;
