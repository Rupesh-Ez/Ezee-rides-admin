import React from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import RideRequestList from '../components/RideRequestList';

const RideRequest = () => {
    const { status } = useParams();
    return (
        <div className="flex overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <RideRequestList status={status} />;
            </div>
        </div>
    )
}

export default RideRequest