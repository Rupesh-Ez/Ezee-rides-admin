import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AdminReport from '../components/AdminReport'

const Report = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <AdminReport/>
      </div>
    </div>
  )
}

export default Report