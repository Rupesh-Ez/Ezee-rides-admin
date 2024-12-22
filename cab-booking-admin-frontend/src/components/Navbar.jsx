import React, { useState } from 'react';
import userIcon from '../assets/man.png'
import LogoutIcon from '../assets/exit.png'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsOpen(false); // Close the dropdown menu
    navigate('/');
  };
  return (
    <nav className="bg-white text-[#535f6b] p-4 flex justify-between items-center relative">
  <h1 className="text-lg font-semibold"></h1>
  <div className="flex gap-6 pr-5 items-center">
    <h2>Dashboard</h2>
    <button onClick={toggleMenu}>
      <img src={userIcon} alt="" className="w-[50px]" />
    </button>
    {isOpen && (
      <div
        className="absolute right-5 top-16 bg-white shadow-lg rounded-lg py-3 px-1 w-32 z-50"
        onClick={(e) => e.stopPropagation()} // Prevent click propagation
      >
        <div
          onClick={handleLogout}
          className="text-[#535f6b] hover:text-blue-500 hover:bg-blue-100 w-full font-semibold flex items-center gap-2 cursor-pointer rounded-md px-2 hover:border-blue-400 hover:border-l-4"
        >
          <img src={LogoutIcon} alt="Logout" className="w-[15px]" />
          <span className="items-center pb-1">Logout</span>
        </div>
      </div>
    )}
  </div>
</nav>

  );
};

export default Navbar;
