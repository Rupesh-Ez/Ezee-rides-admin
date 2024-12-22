import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import WithdrawReport from '../components/WithdrawReport'


const Withdraw = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <WithdrawReport/>
      </div>
    </div>
  )
}

export default Withdraw;