import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import DriverEarningList from '../components/DriverEarningList'

const DriverReport = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <DriverEarningList/>
      </div>
    </div>
  )
}

export default DriverReport