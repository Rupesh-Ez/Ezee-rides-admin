import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ServiceList from '../components/ServiceList'

const Service = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <ServiceList/>
      </div>
    </div>
  )
}

export default Service