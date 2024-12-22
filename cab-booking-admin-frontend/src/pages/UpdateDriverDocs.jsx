import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AddDriverForm from '../components/AddDriverForm'
import { useParams } from 'react-router-dom'


const UpdateDriverDocs = () => {
  const id = useParams();
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <AddDriverForm id={id}/>
      </div>
    </div>
  )
}

export default UpdateDriverDocs