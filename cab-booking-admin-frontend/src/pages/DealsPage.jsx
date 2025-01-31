import React from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import DealsList from '../components/DealsList'

const Deals = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <DealsList/>
      </div>
    </div>
  )
}

export default Deals