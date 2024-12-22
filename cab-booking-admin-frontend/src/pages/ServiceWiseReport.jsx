import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ServiceEarningList from '../components/ServiceEarningList'

const ServiceWiseReport = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <ServiceEarningList/>
      </div>
    </div>
  )
}

export default ServiceWiseReport