import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ComplaintList from '../components/ComplaintList'
import { useParams } from "react-router-dom";

const Complaint = () => {
    const { status } = useParams();
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <ComplaintList status={status} />;
      </div>
    </div>
  )
}

export default Complaint