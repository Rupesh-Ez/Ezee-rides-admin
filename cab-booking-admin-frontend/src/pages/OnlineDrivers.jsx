import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import OnlineDriverList from '../components/OnlineDriversList'

const OnlineDrivers = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <OnlineDriverList/>
      </div>
    </div>
  )
}

export default OnlineDrivers;