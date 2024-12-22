import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import AddPushNotificationForm from '../components/AddPushNotificationForm'

const CreatePushNotification = () => {
  return (
    <div className="flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <AddPushNotificationForm/>
      </div>
    </div>
  )
}

export default CreatePushNotification