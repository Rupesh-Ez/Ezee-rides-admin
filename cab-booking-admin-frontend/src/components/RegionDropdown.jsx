import React, { useState } from "react";

const RegionDropdown = ({ formData, setFormData, regions }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (city,_id) => {
        setFormData({ ...formData, region: city, regionId :_id });
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <label className="block text-sm font-medium mb-1">
                Region <span className="text-red-500">*</span>
            </label>
            <div
                className="w-full p-2 border rounded cursor-pointer"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                {formData.region || "Select Region"}
            </div>
            {isOpen && (
                <ul className="absolute z-10 w-full border bg-white max-h-48 overflow-y-auto rounded shadow-lg">
                    {regions.map((region, index) => (
                        <li
                            key={index}
                            className="p-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => handleSelect(region.city, region._id)}
                        >
                            {region.city}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default RegionDropdown;
