import React, { useState } from 'react';
import userIcon from '../assets/man.png';
import editIcon from '../assets/pen.png';


const AddDriverForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    contactNumber: "",
    gender: "Male",
    service: "",
    carModel: "",
    carColor: "",
    carPlateNumber: "",
    carProductionYear: "",
    bankName: "",
    bankCode: "",
    accountHolderName: "",
    accountNumber: "",
    status: "Inactive",
    description: "",
    routing: "",
  });

  const [userImage, setUserImage] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserImage(event.target.result); // Set the base64 image as state
      };
      reader.readAsDataURL(file);
    }

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted: ", formData);
    // Add API call or logic to save the form data here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-8 p-8 bg-[#f7f9ff]">
        {/* Left Section */}
        <div className="w-1/3 border rounded-lg p-4 bg-white shadow">
          <h2 className="text-xl font-bold mb-4">Add Driver</h2>
          <div className="flex flex-col items-center mb-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 relative">
              <img src={userImage || userIcon} alt="" className='w-full h-full rounded-full object-cove' />
              <input
                type="file"
                id="fileInput"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <img src={editIcon} alt="" className='cursor-pointer absolute bottom-0 left-0 w-9 h-9 bg-white p-1 rounded-full' onClick={() => document.getElementById('fileInput').click()} />
            </div>
            <p className="text-sm mt-2">
              Only <span className="text-blue-500 cursor-pointer">.png .jpg .jpeg .gif</span> Allowed
            </p>
          </div>
          <div className="mt-4">
            <label className="font-bold mb-2 block">Status</label>
            <div className="flex flex-col">
              {["Active", "Inactive", "Pending", "Banned", "Reject"].map((status) => (
                <label key={status}>
                  <input
                    required
                    type="radio"
                    name="status"
                    value={status}
                    checked={formData.status === status}
                    onChange={handleChange}
                  />{" "}
                  {status}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-2/3 border rounded-lg p-4 bg-white shadow">
          <h2 className="text-2xl font-bold mb-6">Add Driver Information</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "First Name", name: "firstName", type: "text" },
              { label: "Last Name", name: "lastName", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Username", name: "username", type: "text" },
              { label: "Password", name: "password", type: "password" },
              { label: "Car Model", name: "carModel", type: "text" },
              { label: "Car Color", name: "carColor", type: "text" },
              { label: "Car Plate Number", name: "carPlateNumber", type: "text" },
              { label: "Car Production Year", name: "carProductionYear", type: "text" },
              { label: "Bank Name", name: "bankName", type: "text" },
              { label: "Bank Code", name: "bankCode", type: "text" },
              { label: "Account Holder Name", name: "accountHolderName", type: "text" },
              { label: "Account Number", name: "accountNumber", type: "text" },
            ].map(({ label, name, type }) => (
              <div key={name}>
                <label className="block mb-1">
                  {label} <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full border border-blue-300 bg-[#f7f9ff] focus:bg-white outline-none rounded p-2"
                />
              </div>
            ))}
            <div>
              <label className="block mb-1">Gender <span className='text-red-500'>*</span></label>
              <select
                required
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded p-2 outline-none border-blue-300 bg-[#f7f9ff] focus:bg-white"
              >
                {["Male", "Female", "Other"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Select Service <span className='text-red-500'>*</span></label>
              <select
                required
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full border rounded p-2 outline-none border-blue-300 bg-[#f7f9ff] focus:bg-white"
              >
                {["Premium", "Prime", "Economy", "Standard"].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Contact Number <span className='text-red-500'>*</span></label>
              <div className='flex'>
                <select className="border rounded p-2 mr-2">
                  <option value="+91">+91</option>
                </select>
                <input
                  required
                  maxLength={10}
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="w-full border rounded p-2 outline-none border-blue-300 bg-[#f7f9ff] focus:bg-white"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1">Routing Number</label>
              <input
                name="routing"
                value={formData.routing}
                onChange={handleChange}
                className="w-full border rounded p-2 outline-none border-blue-200 "
              />
            </div>
            <div className="">
              <label className="block mb-1">Description</label>
              <textarea

                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded p-2 outline-none border-blue-200"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddDriverForm;
