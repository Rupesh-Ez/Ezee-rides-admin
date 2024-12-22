import React, { useState } from 'react';
import carImage from '../assets/car.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import BACKEND_API_ENDPOINT from '../utils/constants.js'

const SignupPage = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BACKEND_API_ENDPOINT}/api/admin/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            });
            if (res.data.success) {
                localStorage.setItem("authToken", res.data.token);
                navigate("/dashboard");
            } else {
                alert("login failed");
            }
        } catch (error) {
            if (error.response && error.response.data) {
                // Display the backend error message
                alert(error.response.data.message || "An error occurred");
            } else {
                console.error("Error:", error.message);
                alert("An unexpected error occurred. Please try again.");
            }
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f7f9ff]">
            <div className="bg-white p-4 rounded-lg shadow-lg w-[470px] h-[450px] flex items-center flex-col">
                <div className='text-center text-2xl mb-2 max-w-24 rounded-full'><img src={carImage} alt="" className='rounded-[50%]' /></div>
                <form onSubmit={handleSignup} className="w-full">
                    <h2 className="text-3xl font-semibold mb-2 text-center">Admin Sign In</h2>
                    <p className='text-center mb-6'>To Keep connected please login with your personal info.</p>
                    <input
                        required
                        type="email"
                        name="email" // Added name attribute
                        placeholder="Email"
                        value={input.email}
                        onChange={changeEventHandler}
                        className="w-full px-4 py-3 border rounded mb-4"
                    />
                    <input
                        required
                        type="password"
                        name="password" // Added name attribute
                        placeholder="Password"
                        value={input.password}
                        onChange={changeEventHandler}
                        className="w-full px-4 py-3 border rounded mb-6"
                    />
                    <div className='flex items-center justify-between mb-4 pl-2'>
                        <div className='flex items-center gap-2'>
                            <input type="checkbox" name="remember" id="remember" className='w-5 h-5' />
                            <label htmlFor="remember" className='pb-1'> Remember Me</label>
                        </div>
                        
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
