import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import RegionList from '../components/RegionList'

const Region = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <RegionList/>
      </div>
    </div>
  )
}

export default Region