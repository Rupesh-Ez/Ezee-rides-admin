import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import PushNotificationList from '../components/PushNotificationList'

const PushNotification = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <PushNotificationList/>
      </div>
    </div>
  )
}

export default PushNotification