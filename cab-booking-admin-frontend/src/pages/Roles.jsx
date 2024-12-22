import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import RoleList from '../components/RoleList'

const Roles = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <RoleList/>
      </div>
    </div>
  )
}

export default Roles