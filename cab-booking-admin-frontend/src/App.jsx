import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx'
import DashBoard from './pages/DashBoard.jsx';
import Customer from './pages/Customer.jsx'
import Coupon from './pages/Coupon.jsx';
import CreateCoupon from './pages/CreateCoupon.jsx';
import './App.css'
import CreateRegion from './pages/CreateRegion.jsx';
import Region from './pages/Region.jsx';
import Service from './pages/Service.jsx';
import CreateService from './pages/CreateService.jsx';
import Driver from './pages/Driver.jsx';
import PendingDriver from './pages/PendingDriver.jsx';

import PushNotification from './pages/PushNotification.jsx';
import CreatePushNotification from './pages/CreatePushNotification.jsx';
import Complaint from './pages/Complaint.jsx';
import RideRequest from './pages/RideRequest.jsx';
import Terms from './pages/Terms.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import Report from './pages/Report.jsx';
// import DriverReport from './pages/DriverReport.jsx';
// import ServiceWiseReport from './pages/ServiceWiseReport.jsx';
import Roles from './pages/Roles.jsx';
import Permissions from './pages/Permissions.jsx';
import { LoadScript } from '@react-google-maps/api'
import UpdateService from './components/UpdateService.jsx';
import UpdateCoupon from './components/UpdateCoupon.jsx';
import UpdateComplaint from './pages/UpdateComplaint.jsx';
import NotFound from './pages/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Withdraw from './pages/Withdraw.jsx';
import UpdateDriverDocs from './pages/UpdateDriverDocs.jsx';
import UpdateRegionForm from './components/UpdateRegion.jsx';

const libraries = ["places", "drawing"];

function App() {

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyBjGyyXWfWYY0gG4OlJTFQ82Gr6SU7siw8"
      libraries={libraries}
    >
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          

          <Route path="/dashboard" element={<ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>} />
          <Route path="/customer" element={<ProtectedRoute><Customer /></ProtectedRoute>} />
          <Route path="/coupon" element={<ProtectedRoute><Coupon /></ProtectedRoute>} />
          <Route path="/coupon/create" element={<ProtectedRoute><CreateCoupon /></ProtectedRoute>} />
          <Route path="/coupon/update/:id" element={<ProtectedRoute><UpdateCoupon /></ProtectedRoute>} />
          <Route path="/region" element={<ProtectedRoute><Region /></ProtectedRoute>} />
          <Route path="/region/create" element={<ProtectedRoute><CreateRegion /></ProtectedRoute>} />
          <Route path="/region/update/:id" element={<ProtectedRoute><UpdateRegionForm/></ProtectedRoute>} />
          <Route path="/service" element={<ProtectedRoute><Service /></ProtectedRoute>} />
          <Route path="/service/create" element={<ProtectedRoute><CreateService /></ProtectedRoute>} />
          <Route path="/service/update/:id" element={<ProtectedRoute><UpdateService /></ProtectedRoute>} />
          <Route path="/driver" element={<ProtectedRoute><Driver /></ProtectedRoute>} />
          <Route path="/driver/pending" element={<ProtectedRoute><PendingDriver /></ProtectedRoute>} />
          <Route path="/driver/update/:id" element={<ProtectedRoute><UpdateDriverDocs/></ProtectedRoute>} />
          
          <Route path="/pushnotification" element={<ProtectedRoute><PushNotification /></ProtectedRoute>} />
          <Route path="/pushnotification/create" element={<ProtectedRoute><CreatePushNotification /></ProtectedRoute>} />
          <Route path="/complaints/:status" element={<ProtectedRoute><Complaint /></ProtectedRoute>} />
          <Route path="/complaints/update/:id" element={<ProtectedRoute><UpdateComplaint /></ProtectedRoute>} />
          <Route path="/riderequest/:status" element={<ProtectedRoute><RideRequest /></ProtectedRoute>} />
          <Route path="/terms" element={<ProtectedRoute><Terms /></ProtectedRoute>} />
          <Route path="/privacypolicy" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
          <Route path="/report" element={<ProtectedRoute><Report /></ProtectedRoute>} />
          {/* <Route path="/report/driver" element={<ProtectedRoute><DriverReport /></ProtectedRoute>} />
          <Route path="/report/servicewise" element={<ProtectedRoute><ServiceWiseReport /></ProtectedRoute>} /> */}
          <Route path="/report/withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
          <Route path="/role" element={<ProtectedRoute><Roles /></ProtectedRoute>} />
          <Route path="/permission" element={<ProtectedRoute><Permissions /></ProtectedRoute>} />
          <Route path="*" element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
        </Routes>
      </Router>
    </LoadScript>
  )
}

export default App
