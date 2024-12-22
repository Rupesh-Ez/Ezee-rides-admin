import React, { useState } from "react";
import MapComponent from "./MapComponent";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import BACKEND_API_ENDPOINT from '../utils/constants.js'

const AddRegionForm = () => {

  const [formData, setFormData] = useState({
    city: '',
    distance: 'km',
    timezone: 'GMT + 5:30',
    status: '',
  });

  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 21.8974, lng: 83.3950 }); // Default location

  const handleChangeMap = (selectedOption) => {
    setFormData({ ...formData, city: selectedOption?.label || "" });

    // Fetch the coordinates for the selected city
    if (selectedOption?.value) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: selectedOption.label }, (results, status) => {
        if (status === "OK" && results[0]?.geometry?.location) {
          const location = results[0].geometry.location;
          setMapCenter({ lat: location.lat(), lng: location.lng() });
        } else {
          alert("Failed to fetch city coordinates!");
        }
      });
    }
  };

  const handlePolygonComplete = (coordinates) => {
    setPolygonCoordinates(coordinates);
  };

  const handleChange = (selectedOption) => {
    setFormData({ ...formData, city: selectedOption?.label || "" });
  };

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    
    const payload = { ...formData, coordinates: polygonCoordinates };
    
    try {
      const res = await axios.post(`${BACKEND_API_ENDPOINT}/api/region/saveregion`, payload, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        setFormData({
          city: '',
          distance: 'km',
          timezone: 'GMT + 5:30',
          status: '',
        });
        setPolygonCoordinates([]);
        alert('Region added successfully');
        navigate("/region")

      } else {
        alert(res.data.message || "hulelelel");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An unexpected error occurred");
    } finally {

      setIsLoading(false); // End loading
    }
  };

  return (

    <div className="py-8 px-4 bg-[#f7f9ff]">
      <form onSubmit={handleSubmit} className="bg-white rounded shadow-sm space-y-4">
        <div className="px-4 border-b-2 border-blue-100 bg-white">
          <h2 className="text-3xl py-4 font-semibold px-2">Add Region</h2>
        </div>
        <div className="grid grid-cols-3 gap-6 p-6">
          {/* City Input */}
          <div className="flex flex-col">
            <label className="font-medium">
              City Name <span className="text-red-500">*</span>
            </label>
            <GooglePlacesAutocomplete
              selectProps={{
                value: formData.city ? { label: formData.city, value: formData.city } : null,
                onChange: handleChangeMap,
              }}
              apiOptions={{ region: 'in' }}
              autocompletionRequest={{
                componentRestrictions: { country: 'in' }, // Restrict results to India
                types: ['(cities)'], // Restrict results to cities only
              }}
            />
          </div>

          {/* Other Form Fields */}
          <div className="flex flex-col">
            <label className="font-medium">
              Distance Unit <span className="text-red-500">*</span>
            </label>
            <select
              name="distanceUnit"
              value={formData.distance}
              onChange={(e) => setFormData({ ...formData, distance: e.target.value })}
              className="border border-gray-300 rounded p-2"
            >
              <option value="km">km</option>
              <option value="mile">mile</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Timezone</label>
            <select
              name="timezone"
              value={formData.timezone}
              onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
              className="border border-gray-300 rounded p-2"
            >
              <option value="GMT + 5:30">GMT + 5:30</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="font-medium">
              Status <span className="text-red-500">*</span>
            </label>
            <select
              name="Status"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="border border-gray-300 rounded p-2"
            >
              <option value="">select</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Map Section */}
        <div className="flex justify-between">
          <div className="w-1/3 relative p-6">
            <img src="https://apps.meetmighty.com/mighty-taxi/images/region.gif" alt="" />
            <p className="mt-1 p-2 text-gray-500"> Drag the map to find the correct area</p>
            <p className="mt-3 p-2 text-gray-500">
              You may begin placing pins on the map and connect them to create an area. Requires a minimum of 3 points.
            </p>
          </div>

          <div className="w-2/3 relative">
            <label className="font-medium">Select Region on Map</label>

            <MapComponent onPolygonComplete={handlePolygonComplete} mapCenter={mapCenter} />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 relative left-5 bottom-5 rounded hover:bg-green-600 transition-colors"
          >
            Save
          </button>
        </div>
      </form>
    </div>

  );
};

export default AddRegionForm;
