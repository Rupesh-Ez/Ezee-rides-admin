import React from "react";
import { useNavigate } from "react-router-dom";
import errorImage from '../assets/404.jpg'

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/dashboard"); // Redirect to the homepage
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <img
        src={errorImage}
        alt="Not Found"
        className="w-1/2 max-w-md mt-4 rounded"
      />
      <h2 className="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        Sorry, the page you're looking for doesn't exist. It might have been removed or is temporarily unavailable.
      </p>
      <button
        onClick={handleGoBack}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded shadow-md transition-all duration-200"
      >
        Go Back to Homepage
      </button>
    </div>
  );
};

export default NotFound;
