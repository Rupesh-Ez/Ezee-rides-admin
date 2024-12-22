import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AddServiceForm from '../components/AddServiceForm'

const CreateService = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <AddServiceForm/>
      </div>
    </div>
  )
}

export default CreateService