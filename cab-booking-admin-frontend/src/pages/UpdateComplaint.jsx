import React from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useParams } from "react-router-dom";
import UpdateComplaintForm from '../components/UpdateComplaintForm.jsx'



const UpdateComplaint = () => {
    const { id } = useParams();
  return (
      <div className="flex overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <UpdateComplaintForm id={id} />;
        </div>
      </div>
  )
}

export default UpdateComplaint