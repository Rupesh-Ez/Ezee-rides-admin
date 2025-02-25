import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaList, FaPlus, FaAngleRight, FaAngleUp } from 'react-icons/fa';
import { FaHome, FaUser, FaGlobe, FaCar, FaFileAlt, FaGift, FaCarAlt, FaExclamationTriangle, FaDollarSign } from 'react-icons/fa';
import { HiMenu, HiDocumentReport } from "react-icons/hi";
import { IoSettingsSharp } from 'react-icons/io5';
import { MdOutlineSecurity } from 'react-icons/md';
import { AiFillNotification } from "react-icons/ai";
import { SiGoogledocs } from "react-icons/si";
import car from '../assets/car.png'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isDriverOpen, setIsDriverOpen] = useState(false);
  const [isPushNotification, setIsPushNotification] = useState(false);
  const [isComplaintOpen, setIsComplaintOpen] = useState(false);
  const [isRideReqOpen, setIsRideReqOpen] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [isAccSetting, setIsAccSetting] = useState(false);


  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };
  const toggleCouponDropdown = () => {
    setIsCouponOpen(!isCouponOpen);
  };
  const toggleRegionDropdown = () => {
    setIsRegionOpen(!isRegionOpen);
  };
  const toggleServiceDropdown = () => {
    setIsServiceOpen(!isServiceOpen);
  };
  const toggleDriverDropdown = () => {
    setIsDriverOpen(!isDriverOpen);
  };
  const togglePushNotificationDropdown = () => {
    setIsPushNotification(!isPushNotification);
  };
  const toggleComplaintDropdown = () => {
    setIsComplaintOpen(!isComplaintOpen);
  };
  const toggleRideReqDropdown = () => {
    setIsRideReqOpen(!isRideReqOpen);
  };
  const toggleReportDropdown = () => {
    setIsReport(!isReport);
  };
  const toggleAccSettingDropdown = () => {
    setIsAccSetting(!isAccSetting);
  };

  return (
    <div className={`bg-white text-[#535f6b] p-5 transition-width ease-in-out duration-700 text-sm font-semibold ${isCollapsed ? 'w-20' : 'w-60'}`}>
      <div className='flex items-center justify-between px-2 mb-4'>
        {!isCollapsed && <img src={car} alt="carlogo" className=' w-12 h-12 rounded-full' />}
        <button onClick={toggleSidebar} className="mb-4 text-gray-500 hover:text-gray-800 pt-2">
          <HiMenu className='h-8 w-8' />
        </button>
      </div>

      <ul className="space-y-4">
        <li>
          <Link to="/dashboard" className="flex items-center space-x-3 p-2 hover:bg-blue-200 hover:text-blue-600 rounded">
            <FaHome />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
        </li>
        <li>
          <Link to="/customer" className="flex items-center space-x-3 p-2 hover:bg-blue-100 hover:text-blue-600 rounded">
            <FaUser />
            {!isCollapsed && <span>Customer</span>}
          </Link>
        </li>
        <li>
          <div
            onClick={toggleRegionDropdown}
            className="flex items-center justify-between space-x-3 p-2 hover:bg-blue-100 hover:text-blue-600 rounded cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <FaGlobe />
              {!isCollapsed && <span>Region</span>}
            </div>
            {!isCollapsed && (isRegionOpen ? <FaAngleUp /> : <FaAngleRight />)}
          </div>

          <ul
            className={`space-y-4 overflow-hidden border-blue-100 border rounded transition-all duration-700 ease-in-out ${isRegionOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <li>
              <Link
                to="/region"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaList />
                <span>Region List</span>
              </Link>
            </li>
            <li>
              <Link
                to="/region/create"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaPlus />
                <span>Add Region</span>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <div
            onClick={toggleServiceDropdown}
            className="flex items-center justify-between space-x-3 p-2 hover:bg-blue-100 hover:text-blue-600 rounded cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <FaFileAlt />
              {!isCollapsed && <span>Service</span>}
            </div>
            {!isCollapsed && (isServiceOpen ? <FaAngleUp /> : <FaAngleRight />)}
          </div>

          <ul
            className={`space-y-4 overflow-hidden border-blue-100 border rounded transition-all duration-700 ease-in-out ${isServiceOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <li>
              <Link
                to="/service"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaList />
                <span>Service List</span>
              </Link>
            </li>
            <li>
              <Link
                to="/service/create"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaPlus />
                <span>Add Service</span>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <div
            onClick={toggleDriverDropdown}
            className="flex items-center justify-between space-x-3 p-2 hover:bg-blue-100 hover:text-blue-600 rounded cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <FaCar />
              {!isCollapsed && <span>Driver</span>}
            </div>
            {!isCollapsed && (isDriverOpen ? <FaAngleUp /> : <FaAngleRight />)}
          </div>

          <ul
            className={`space-y-4 overflow-hidden border-blue-100 border rounded transition-all duration-700 ease-in-out ${isDriverOpen ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <li>
              <Link
                to="/driver"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaList />
                <span>Driver List</span>
              </Link>
            </li>
            <li>
              <Link
                to="/driver/pending"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaList />
                <span>Pending Driver</span>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <div
            onClick={toggleCouponDropdown}
            className="flex items-center justify-between space-x-3 p-2 hover:bg-blue-100 hover:text-blue-600 rounded cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <FaGift />
              {!isCollapsed && <span>Coupon</span>}
            </div>
            {!isCollapsed && (isCouponOpen ? <FaAngleUp /> : <FaAngleRight />)}
          </div>

          <ul
            className={`space-y-4 overflow-hidden border-blue-100 border rounded transition-all duration-700 ease-in-out ${isCouponOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <li>
              <Link
                to="/coupon"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaList />
                <span>Coupon List</span>
              </Link>
            </li>
            <li>
              <Link
                to="/coupon/create"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaPlus />
                <span>Add Coupon</span>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <div
            onClick={toggleRideReqDropdown}
            className="flex items-center justify-between space-x-3 p-2 hover:bg-blue-100 hover:text-blue-600 rounded cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <FaCarAlt />
              {!isCollapsed && <span>Ride request</span>}
            </div>
            {!isCollapsed && (isRideReqOpen ? <FaAngleUp /> : <FaAngleRight />)}
          </div>

          <ul
            className={`space-y-4 overflow-hidden border-blue-100 border rounded transition-all duration-700 ease-in-out ${isRideReqOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <li>
              <Link
                to="/riderequest/all"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaList />
                <span>All List</span>
              </Link>
            </li>
            <li>
              <Link
                to="/riderequest/new"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaList />
                <span>New Ride List</span>
              </Link>
            </li>
            <li>
              <Link
                to="/riderequest/completed"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaList />
                <span>Completed List</span>
              </Link>
            </li>
            <li>
              <Link
                to="/riderequest/cancelled"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaList />
                <span>Cancelled List</span>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <div
            onClick={toggleComplaintDropdown}
            className="flex items-center justify-between space-x-3 p-2 hover:bg-blue-100 hover:text-blue-600 rounded cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <FaExclamationTriangle />
              {!isCollapsed && <span>Complaints</span>}
            </div>
            {!isCollapsed && (isComplaintOpen ? <FaAngleUp /> : <FaAngleRight />)}
          </div>

          <ul
            className={`space-y-4 overflow-hidden border-blue-100 border rounded transition-all duration-700 ease-in-out ${isComplaintOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <li>
              <Link
                to="/complaints/resolved"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaList />
                <span>Resolved List</span>
              </Link>
            </li>
            <li>
              <Link
                to="/complaints/pending"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaList />
                <span>Pending List</span>
              </Link>
            </li>
            <li>
              <Link
                to="/complaints/investigation"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaList />
                <span>Investigation List</span>
              </Link>
            </li>
            
          </ul>
        </li>
        <li>
          <div
            onClick={toggleAccSettingDropdown}
            className="flex items-center justify-between space-x-3 p-2 hover:bg-blue-100 hover:text-blue-600 rounded cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <IoSettingsSharp />
              {!isCollapsed && <span>Account Settings</span>}
            </div>
            {!isCollapsed && (isAccSetting ? <FaAngleUp /> : <FaAngleRight />)}
          </div>

          <ul
            className={`space-y-4 overflow-hidden border-blue-100 border rounded transition-all duration-700 ease-in-out ${isAccSetting ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <li>
              <Link
                to="/role"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaList />
                <span>Role List</span>
              </Link>
            </li>
            <li>
              <Link
                to="/permission"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaList />
                <span>Permissions List</span>
              </Link>
            </li>
            
          </ul>
        </li>
        <li>
          <Link to="/deals/deal-list" className="flex items-center space-x-3 p-2 hover:bg-blue-100 hover:text-blue-600 rounded">
          <FaGift />
            {!isCollapsed && <span>Deals</span>}
          </Link>
        </li>
        <li>
          <Link to="/report/withdraw" className="flex items-center space-x-3 p-2 hover:bg-blue-100 hover:text-blue-600 rounded">
          <FaDollarSign />
            {!isCollapsed && <span>Withdrawl Requests</span>}
          </Link>
        </li>
        <li>
          <Link to="/terms" className="flex items-center space-x-3 p-2 hover:bg-blue-100 hover:text-blue-600 rounded">
            <SiGoogledocs />
            {!isCollapsed && <span>Terms And Conditions</span>}
          </Link>
        </li>
        <li>
          <Link to="/privacypolicy" className="flex items-center space-x-3 p-2 hover:bg-blue-100 hover:text-blue-600 rounded">
            <MdOutlineSecurity />
            {!isCollapsed && <span>Privacy Policy</span>}
          </Link>
        </li>
        <li>
          <div
            onClick={togglePushNotificationDropdown}
            className="flex items-center justify-between space-x-3 p-2 hover:bg-blue-100 hover:text-blue-600 rounded cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <AiFillNotification />
              {!isCollapsed && <span>Push Notification</span>}
            </div>
            {!isCollapsed && (isPushNotification ? <FaAngleUp /> : <FaAngleRight />)}
          </div>

          <ul
            className={`space-y-4 overflow-hidden border-blue-100 border rounded transition-all duration-700 ease-in-out ${isPushNotification ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <li>
              <Link
                to="/pushnotification"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaList />
                <span>Push Notification List</span>
              </Link>
            </li>
            <li>
              <Link
                to="/pushnotification/create"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaPlus />
                <span>Add Push Notification</span>
              </Link>
            </li>
          </ul>
        </li>
        
        <li>
          <div
            onClick={toggleReportDropdown}
            className="flex items-center justify-between space-x-3 p-2 hover:bg-blue-100 hover:text-blue-600 rounded cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <HiDocumentReport />
              {!isCollapsed && <span>Reports</span>}
            </div>
            {!isCollapsed && (isReport ? <FaAngleUp /> : <FaAngleRight />)}
          </div>

          <ul
            className={`space-y-4 overflow-hidden border-blue-100 border rounded transition-all duration-700 ease-in-out ${isReport ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
              }`}
          >
            <li>
              <Link
                to="/report"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaList />
                <span>Admin Report</span>
              </Link>
            </li>
            {/* <li>
              <Link
                to="/report/servicewise"
                className="flex items-center space-x-3 p-2 hover:bg-blue-50 hover:text-blue-600 rounded"
              >
                <FaDollarSign />
                <span>Service Wise</span>
              </Link>
            </li> */}
            
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
