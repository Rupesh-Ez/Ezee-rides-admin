import React from 'react';
import Sidebar from '../components/Sidebar.jsx'
import HeroSection from '../components/HeroSection.jsx'
import Navbar from '../components/Navbar.jsx'


const Dashboard = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <HeroSection />
      </div>
    </div>
  );
};

export default Dashboard;
