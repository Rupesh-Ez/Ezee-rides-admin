import React, { useEffect, useState } from 'react';
import { MdOutlineRotate90DegreesCw } from "react-icons/md";
import userIcon from '../assets/man.png';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import BACKEND_API_ENDPOINT from '../utils/constants.js'

const AddDriverForm = ({ id }) => {
  const [selectedDocument, setSelectedDocument] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [DLvalidate, setDLverified] = useState(false);
  const [DLrejected, setDLrejected] = useState(false);
  const [RCvalidate, setRCverified] = useState(false);
  const [RCrejected, setRCrejected] = useState(false);
  const [Vehiclevalidate, setVehicleverified] = useState(false);
  const [Vehiclerejected, setVehiclerejected] = useState(false);
  const [Identityvalidate, setIdentityverified] = useState(false);
  const [Identityrejected, setIdentityrejected] = useState(false);
  const [ACvalidate, setACverified] = useState(false);
  const [PANvalidate, setPANverified] = useState(false);
  const [bankaccvalidate, setBankaccvalidate] = useState(false);
  const [images, setImages] = useState({});

  const getImageUrl = (doc) => {

    var img1, img2;
    if (doc === "Driving Licence") {
      img1 = images["DL Upload Front"];
      img2 = images["DL Upload Back"];
    } else if (doc === "Registration Certificate") {
      img1 = images["RC Upload Front"];
      img2 = images["RC Upload Back"];
    } else if (doc === "Adhar Card") {
      img1 = images["Aadhaar Upload Front"]
      img2 = images["Aadhaar Upload Back"]
    } else if (doc === "Licence Plate") {
      img1 = images["Upload License Plate"];
    } else if (doc === "PAN Card") {
      img1 = images["Pan Card Upload Front"]
    } else if (doc === "Profile Picture") {
      img1 = images["profile"]
    }
    return [img1, img2];
  }

  const toggleBankValidate = ()=>{
    setBankaccvalidate(!bankaccvalidate);
  }

  const fetchImages = async (fileIds) => {
    const imageUrls = {};

    for (const [fileType, fileId] of Object.entries(fileIds)) {
      try {
        // Make API call to fetch file data
        const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/driver/document/${fileId}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        if (response.data.success) {
          const extractedData = [];

          Object.entries(response.data.data.files).forEach(([key, value]) => {
            extractedData.push({
              key, // The descriptive name (e.g., "DL Upload Front")
              fileData: value.fileData // The binary file data
            });
          });

          extractedData.forEach(({ key, fileData }) => {
            // Create a data URL for the image
            const imageUrl = `data:image/jpeg;base64,${fileData}`;
            imageUrls[key] = imageUrl;
          });
        }
      } catch (error) {
        console.error(`Failed to fetch image for ${fileType}:`, error);
      }
    }
    setImages(imageUrls);
  };


  const handleOpenModal = (documentType) => {
    setSelectedDocument(documentType);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedDocument(null);
    setIsModalOpen(false);
    setRotation(0);
  };

  const handleVerify = () => {
    if (selectedDocument === "Driving Licence") {
      setDLverified(true);
      setDLrejected(false);
    } else if (selectedDocument === "Registration Certificate") {
      setRCverified(true);
      setRCrejected(false);
    } else if (selectedDocument === "Licence Plate") {
      setVehicleverified(true);
      setVehiclerejected(false);
    } else if (selectedDocument === "Adhar Card") {
      setACverified(true);
    } else {
      setPANverified(true);
    }
    handleCloseModal();
  };

  const handleReject = () => {
    if (selectedDocument === "Driving Licence") {
      setDLverified(false);
      setDLrejected(true);
    } else if (selectedDocument === "Registration Certificate") {
      setRCrejected(true);
      setRCverified(false);
    } else if (selectedDocument === "Licence Plate") {
      setVehicleverified(false);
      setVehiclerejected(true);
    } else if (selectedDocument === "Adhar Card") {
      setACverified(false);
    } else {
      setPANverified(false);
    }
    handleCloseModal();
  };
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    dateOfBirth: "",
    referralCode: "",
    phonenumber: "",
    gender: "Male",
    vehicletype: "",
    model: "",
    color: "",
    Year: "",
    vehiclecompany: "",
    vehiclenumber: "",
    ownership: "",
    licensenumber: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
  });
  const navigate = useNavigate();

  const [filesObjestIds, setFilesObjectIds] = useState({});

  const fillFilesDataObjectId = (files) => {
    const fileIds = {};

    files.forEach((fileObj) => {
      // Extract the first key in the file object
      const fileKey = Object.keys(fileObj)[0];
      if (fileKey && fileObj[fileKey]?.fileId) {
        // Map the fileKey to its fileId
        fileIds[fileKey] = fileObj[fileKey].fileId;
      }
    });

    // Update state with the extracted fileIds
    setFilesObjectIds(fileIds);
  }

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/driver/getdriverbyid/${id.id}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        if (response.data.success) {
          fillFilesDataObjectId(response.data.data.files);
          setDLverified(response.data.data.DLvalidate);
          setDLrejected(response.data.data.DLrejected);
          setRCverified(response.data.data.RCvalidate);
          setRCrejected(response.data.data.RCrejected);
          setVehicleverified(response.data.data.Vehiclevalidate);
          setVehiclerejected(response.data.data.Vehiclerejected);
          setIdentityverified(response.data.data.Identityvalidate);
          setIdentityrejected(response.data.data.Identityrejected);
          setBankaccvalidate(response.data.data.bankaccvalidate);
          
          setACverified(response.data.data.Identityvalidate);
          setPANverified(response.data.data.Identityvalidate);
          

          setFormData(response.data.data);

        } else {
          alert('Failed to fetch drivers');
        }
      } catch (error) {
        alert('An error occurred while fetching drivers');
      }
    };

    fetchDriver();
  }, []);

  useEffect(() => {
    if (Object.keys(filesObjestIds).length > 0) {
      fetchImages(filesObjestIds);
    }
  }, [filesObjestIds]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (ACvalidate && PANvalidate) {
      setIdentityverified(true);
    }
  }, [ACvalidate, PANvalidate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare the data to send
      const verificationData = {
        ...formData,
        ACvalidate,
        PANvalidate,
        DLvalidate,
        DLrejected,
        RCvalidate,
        RCrejected,
        Vehiclevalidate,
        Vehiclerejected,
        Identityvalidate : !!(ACvalidate && PANvalidate),
        Identityrejected : !(ACvalidate && PANvalidate),
        bankaccvalidate,
        filesObjestIds,
      };


      // Send POST request to the backend
      const response = await axios.post(
        `${BACKEND_API_ENDPOINT}/api/driver/update/${id.id}`,
        verificationData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, // If using cookies for authentication
        }
      );

      // Handle the response
      if (response.data.success) {
        alert('Verification statuses updated successfully.');
      } else {
        console.error('Failed to update statuses:', response.data.message);
        alert('Failed to update verification statuses.');
      }
    } catch (error) {
      console.error('Error updating verification statuses:', error);
      alert('An error occurred while updating verification statuses.');
    }

    navigate("/driver");
  };
  let checkDisabled = () => {
    if (selectedDocument === "Driving Licence" && DLvalidate) {
      return true;
    } else if (selectedDocument === "Registration Certificate" && RCvalidate) {
      return true;
    } else if (selectedDocument === "Licence Plate" && Vehiclevalidate) {
      return true;
    } else if (selectedDocument === "Adhar Card" && ACvalidate) {
      return true;
    } else if (selectedDocument === "PAN Card" && PANvalidate) {
      return true;
    }
    return false;
  }

  const [rotation, setRotation] = useState(0);

  return (
    <form onSubmit={handleSubmit}>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
          onClick={handleCloseModal}>
          <div className="bg-white p-6 rounded shadow-lg w-[70%] h-[80%]" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-bold mb-4">
              {selectedDocument} Document
            </h2>
            <div className="mb-4 flex gap-2">
              {(() => {
                const [img1, img2] = getImageUrl(selectedDocument);
                return (
                  <>
                    {(!img1 && !img2)&& (
                      <span className='text-4xl font-semibold text-blue-400 py-[10rem] px-[18rem]'> Hang On Loading docs... </span>
                    )}
                    
                    {img1 && (
                      <img
                        src={img1}
                        alt={`${selectedDocument} Front not uploaded yet!!!`}
                        className="w-1/2 h-96 object-contain"
                        style={{ transform: `rotate(${rotation}deg)` }}
                      />
                    )}
                    {img2 && (
                      <img
                        src={img2}
                        alt={`${selectedDocument} Back not uploaded yet!!!`}
                        className="w-1/2 h-96 object-contain"
                        style={{ transform: `rotate(${rotation}deg)` }}
                      />
                    )}
                  </>
                );
              })()}
            </div>

            <div className="flex justify-between">
              <div className=' flex gap-3 mt-4'>
                <button
                  type='button'
                  className={`bg-green-500 text-white px-4 py-2 hover:bg-green-600 rounded ${checkDisabled() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleVerify}
                  disabled={checkDisabled()}
                >
                  Verify
                </button>
                <button
                  type='button'
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  onClick={handleReject}
                >
                  Reject
                </button>
              </div>
              <div className='mt-4'>
                 <button className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-xl' type='button' onClick={() => setRotation((prev) => (prev + 90)%360)}>
                  <MdOutlineRotate90DegreesCw className='w-8 h-8'/>
                  </button>
              </div>
            
              <button
                type='button'
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded mt-4"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex gap-8 p-8 bg-[#f7f9ff]">
        {/* Left Section */}
        <div className="w-1/3 border rounded-lg p-4 bg-white shadow">
          <h2 className="text-xl font-bold mb-4">Driver Documents</h2>
          <div className="flex flex-col items-center mb-4">
            <div className="w-48 h-48 rounded-full bg-gray-200 ">
              {
                (() => {
                  const [img1, img2] = getImageUrl("Profile Picture");
                  return (
                    <img src={img1 || userIcon} alt="" className='w-full h-full rounded-full object-contain' />
                  )
                })()
              }
            </div>

          </div>
          <div className="mt-24">
            <ul className="flex gap-4 flex-col">
              <li>
                <button
                  type='button'
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleOpenModal('Driving Licence')}
                >
                  Driving Licence
                </button><span className={`${(DLvalidate) ? "text-green-400" : "text-red-500"} ml-4 font-semibold`}>{(DLvalidate) ? " ✅ Verified" : "❌ Not verified"}</span>
              </li>

              <li>
                <button
                  type='button'
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleOpenModal('Licence Plate')}
                >
                  License Plate
                </button><span className={`${(Vehiclevalidate) ? "text-green-400" : "text-red-500"} ml-4 font-semibold`}>{(Vehiclevalidate) ? " ✅ Verified" : "❌ Not verified"}</span>
              </li>
              <li>
                <button
                  type='button'
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={() => handleOpenModal('Adhar Card')}
                >
                  Adhar Card
                </button><span className={`${(ACvalidate) ? "text-green-400" : "text-red-500"} ml-4 font-semibold`}>{(ACvalidate) ? " ✅ Verified" : "❌ Not verified"}</span>
              </li>
              <li>
                <button
                  type='button'
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => handleOpenModal('Registration Certificate')}
                >
                  Registration Certificate(RC)
                </button><span className={`${(RCvalidate) ? "text-green-400" : "text-red-500"} ml-4 font-semibold`}> {(RCvalidate) ? "✅ Verified" : "❌ Not verified"}</span>
              </li>
              <li>
                <button
                  type='button'
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  onClick={() => handleOpenModal('PAN Card')}
                >
                  PAN Card
                </button><span className={`${(PANvalidate) ? "text-green-400" : "text-red-500"} ml-4 font-semibold`}>{(PANvalidate) ? " ✅ Verified" : "❌ Not verified"}</span>
              </li>
              <li>
                <button
                  type='button'
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => toggleBankValidate()}
                >
                  Verify Bank Account
                </button><span className={`${(bankaccvalidate) ? "text-green-400" : "text-red-500"} ml-4 font-semibold`}>{(bankaccvalidate) ? " ✅ Verified" : "❌ Not verified"}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-2/3 border rounded-lg p-4 bg-white shadow">
          <h2 className="text-2xl font-bold mb-6">Driver Information</h2>

          <fieldset className="border border-gray-400 rounded px-2 mb-2">
            <legend className="text-lg font-semibold px-2">Driver Details</legend>
            <div className="grid grid-cols-2 gap-4 p-2">
              {[
                { label: "Full Name", name: "fullname", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Date Of Brith", name: "dateOfBirth", type: "text" },
                { label: "Gender", name: "gender", type: "text" },


                { label: "Driver Licence Number", name: "licensenumber", type: "text" },
                { label: "Vehicle type", name: "vehicletype", type: "text" },
                { label: "Ownership", name: "ownership", type: "text" },
                { label: "Vehicle Company", name: "vehiclecompany", type: "text" },
                { label: "Vehicle Model", name: "model", type: "text" },
                { label: "Vehicle Plate Number", name: "vehiclenumber", type: "text" },
                { label: "Color", name: "color", type: "text" },
                { label: "Production Year", name: "Year", type: "text" },
                { label: "Referral Code", name: "referralCode", type: "text" },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block mb-1">
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    // disabled
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border border-blue-300 bg-[#f7f9ff] focus:bg-white outline-none rounded p-2"
                  />
                </div>
              ))}
            </div>
          </fieldset>
          <div>
            <fieldset className="border border-gray-400 rounded p-2 grid grid-cols-2 gap-4">
              <legend className="text-lg font-semibold px-2">Driver Account Details</legend>

              {[
                { label: "Account Holder Name", name: "accountHolderName", type: "text" },
                { label: "Account Number", name: "accountNumber", type: "text" },
                { label: "IFSC Code Number", name: "ifscCode", type: "text" },
              ].map(({ label, name, type }) => (
                <div key={name} className="mb-4">
                  <label className="block mb-1">
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    // disabled
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="w-full border border-blue-300 bg-[#f7f9ff] focus:bg-white outline-none rounded p-2"
                  />
                </div>
              ))}
              <div>
                <label className="block mb-1">Contact Number <span className='text-red-500'>*</span></label>
                <div className='flex'>
                  <select className="border rounded p-2 mr-2">
                    <option value="+91">+91</option>
                  </select>
                  <input
                    // disabled
                    maxLength={10}
                    name="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleChange}
                    className="w-full border rounded p-2 outline-none border-blue-300 bg-[#f7f9ff] focus:bg-white"
                  />
                </div>
              </div>

            </fieldset>

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
