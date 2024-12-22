import React from 'react'
import CouponList from '../components/CouponList'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const Coupon = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <CouponList/>
      </div>
    </div>
  )
}

export default Coupon