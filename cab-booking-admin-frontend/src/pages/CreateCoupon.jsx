import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AddCouponForm from '../components/AddCouponForm'

const CreateCoupon = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <AddCouponForm/>
      </div>
    </div>
  )
}

export default CreateCoupon