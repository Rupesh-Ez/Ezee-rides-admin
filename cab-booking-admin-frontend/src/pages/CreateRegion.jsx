import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AddRegionForm from '../components/AddRegionForm'

const CreateRegion = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <AddRegionForm />
      </div>
    </div>
  )
}

export default CreateRegion