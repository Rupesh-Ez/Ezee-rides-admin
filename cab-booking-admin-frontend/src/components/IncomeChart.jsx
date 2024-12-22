import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios'
import BACKEND_API_ENDPOINT from '../utils/constants.js'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
  
  
  const IncomeChart = () => {
  const [earnings, setEarnings] = useState([]);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Earnings',
        backgroundColor: '#3b82f6',
        data: earnings,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'bottom' },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };


    useEffect(() => {
        const fetchEarnings = async () => {
            try {
                const response = await axios.get(`${BACKEND_API_ENDPOINT}/api/withdraw/monthwiseearnings`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                if (response.data.success) {

                    setEarnings(response.data.data);

                } else {
                    alert('Failed to fetch rides');
                }
            } catch (error) {
                console.error('Error fetching Rides:', error);
                alert('An error occurred while fetching rides');
            }
        };

        fetchEarnings();
    }, []);
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transform transition-transform hover:scale-105">
      <h2 className="text-xl font-semibold mb-4">Income</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default IncomeChart;
