import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import PermissionList from '../components/PermissionList'

const Permissions = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <PermissionList/>
      </div>
    </div>
  )
}

export default Permissions