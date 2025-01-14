import React, { useEffect, useState } from 'react';
import bike from '../assets/DashboardIcons/bike.png'
import car from '../assets/DashboardIcons/car.png'
import complaint from '../assets/DashboardIcons/complaint.png'
import voucher from '../assets/DashboardIcons/voucher.png'
import user from '../assets/DashboardIcons/user.png'
import wallet from '../assets/DashboardIcons/wallet.png'
import salary from '../assets/DashboardIcons/salary.png'
import profit from '../assets/DashboardIcons/profit.png'
import RecentRequests from './RecentRequests.jsx'
import IncomeChart from './IncomeChart.jsx'
import Footer from './Footer.jsx';
import axios from 'axios';
import BACKEND_API_ENDPOINT from '../utils/constants.js';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [cardsData, setCardsData] = useState([
    { count: 0, label: "Total Driver", icon: user,link:'/driver' },
    { count: 0, label: "Total Customer", icon: bike,link:'/customer' },
    { count: 0, label: "Total Rides", icon: car,link:'/riderequest/all' },
    { count: 0, label: "Total Coupons", icon: voucher,link:'/coupon' },
    { count: 512, label: "Monthly Earning", icon: wallet,link:'/dashboard' },
    { count: 98, label: "Total Earning", icon: profit,link:'/dashboard' },
    { count: 0, label: "Withdraw Requests", icon: salary,link:'/report/withdraw' },
    { count: 0, label: "Complaints", icon: complaint,link:'/complaints/resolved' },
  ])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          customerResponse,
          driverResponse,
          couponResponse,
          complaintResponse,
          rideResponse,
          withdrawcount,
          monthlyEarningResponse,
          totalEarningResponse,
        ] = await Promise.all([
          axios.get(`${BACKEND_API_ENDPOINT}/api/customer/count`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }),
          axios.get(`${BACKEND_API_ENDPOINT}/api/driver/count`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }),
          axios.get(`${BACKEND_API_ENDPOINT}/api/coupon/count`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }),
          axios.get(`${BACKEND_API_ENDPOINT}/api/complaint/count`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }),
          axios.get(`${BACKEND_API_ENDPOINT}/api/rides/count`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }),
          axios.get(`${BACKEND_API_ENDPOINT}/api/withdraw/count`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }),
          axios.get(`${BACKEND_API_ENDPOINT}/api/withdraw/monthlyearnings`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }),
          axios.get(`${BACKEND_API_ENDPOINT}/api/withdraw/totalearnings`, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }),
        ]);

        // Extract the counts from responses
        const customerCount = customerResponse.data.count || 0;
        const driverCount = driverResponse.data.count || 0;
        const couponCount = couponResponse.data.count || 0;
        const complaintCount = complaintResponse.data.count || 0;
        const rideCount = rideResponse.data.count || 0;
        const withdrawCount = withdrawcount.data.count || 0;
        const monthlyCount = monthlyEarningResponse.data.count || 0;
        const totalCount = totalEarningResponse.data.count || 0;

        // Update the cardsData state
        setCardsData((prevCardsData) =>
          prevCardsData.map((card) => {
            switch (card.label) {
              case "Total Customer":
                return { ...card, count: customerCount };
              case "Total Driver":
                return { ...card, count: driverCount };
              case "Total Coupons":
                return { ...card, count: couponCount };
              case "Complaints":
                return { ...card, count: complaintCount };
              case "Total Rides":
                return { ...card, count: rideCount };
              case "Withdraw Requests":
                return { ...card, count: withdrawCount };
              case "Monthly Earning":
                return {...card,count:monthlyCount}
              case "Total Earning":
                return {...card,count:totalCount}
              default:
                return card; // Keep other cards unchanged
            }
          })
        );
      } catch (error) {
        console.error('Error fetching Details:', error);
        alert('An error occurred while fetching Details');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto h-full px-6 py-4 bg-[#f7f9ff]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardsData.map((card, index) => (
          <Link
            key={index}
            to={card.link} // Assuming 'link' property in card contains the navigation URL
            className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-between hover:shadow-xl transform transition-transform hover:scale-105"
          >
            <div className="text-primary">
              <img src={card.icon} alt={card.label} className="w-12 h-12" />
            </div>
            <div>
              <h5 className="font-semibold text-xl">{card.count}</h5>
              <p className="text-gray-500">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className="container mx-auto py-8 grid gap-6 md:grid-cols-2">
        {/* <RecentRequests /> */}
        <IncomeChart />
      </div>
    </div>
  );
};

export default HeroSection;
