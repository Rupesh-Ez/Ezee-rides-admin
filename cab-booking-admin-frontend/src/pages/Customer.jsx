import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import CustomerData from '../components/CustomerData'

const Customer = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <CustomerData/>
      </div>
    </div>
  )
}

export default Customer