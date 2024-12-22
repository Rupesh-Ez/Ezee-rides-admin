import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import DriverList from '../components/DriverList'

const Driver = () => {
  const pending=false;
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <DriverList pending={pending}/>
      </div>
    </div>
  )
}

export default Driver