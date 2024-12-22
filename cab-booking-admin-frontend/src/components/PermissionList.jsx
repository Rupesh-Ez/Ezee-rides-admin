import React, { useState } from "react";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";

const PermissionList = () => {
    const sections = [
        "Role",
        "Permission",
        "Region",
        "Service",
        "Driver",
        "Customer",
        "RiderRequest",
        "DriverDocs",
        "Coupon",
        "Complaint",
        "PushNotification",
    ];

    const [collapsedSections, setCollapsedSections] = useState(
        sections.reduce((acc, section) => ({ ...acc, [section]: false }), {})
    );

    const toggleSection = (section) => {
        setCollapsedSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    const [permissions, setPermissions] = useState([
        {
            permission: {
                1: { name: "Permission Add", roles: { Admin: true, Driver: false, Rider: false, U: false } },
                2: { name: "Permission List", roles: { Admin: true, Driver: false, Rider: false, U: false } },
            },
        },
        {
            role: {
                1: { name: "Role Add", roles: { Admin: true, Driver: true, Rider: false, U: false } },
                2: { name: "Role List", roles: { Admin: true, Driver: false, Rider: false, U: false } },
            },
        },
        {
            region: {
                1: { name: "Region Add", roles: { Admin: true, Driver: true, Rider: false, U: false } },
                2: { name: "Region List", roles: { Admin: true, Driver: false, Rider: false, U: false } },
                3: { name: "Region Edit", roles: { Admin: true, Driver: false, Rider: false, U: false } },
                4: { name: "Region Delete", roles: { Admin: true, Driver: false, Rider: false, U: false } },
            },
        },
        {
            service: {
                1: { name: "Service Add", roles: { Admin: true, Driver: true, Rider: false, U: false } },
                2: { name: "Service List", roles: { Admin: true, Driver: false, Rider: false, U: false } },
                3: { name: "Service Edit", roles: { Admin: true, Driver: false, Rider: false, U: false } },
                4: { name: "Service Delete", roles: { Admin: true, Driver: false, Rider: false, U: false } },
            },
        },
        {
            driver: {
                1: { name: "Driver Add", roles: { Admin: true, Driver: true, Rider: false, U: false } },
                2: { name: "Driver List", roles: { Admin: true, Driver: false, Rider: false, U: false } },
                3: { name: "Driver Edit", roles: { Admin: true, Driver: false, Rider: false, U: false } },
                4: { name: "Driver Delete", roles: { Admin: true, Driver: false, Rider: false, U: false } },
            },
        },
        {
            customer: {
                1: { name: "Customer Add", roles: { Admin: true, Driver: true, Rider: false, U: false } },
                2: { name: "Customer List", roles: { Admin: true, Driver: false, Rider: false, U: false } },
                3: { name: "Customer Edit", roles: { Admin: true, Driver: false, Rider: false, U: false } },
                4: { name: "Customer Delete", roles: { Admin: true, Driver: false, Rider: false, U: false } },
            },
        },
    ]);

    const handleCheckboxChange = (sectionKey, permissionKey, role) => {
        setPermissions((prevPermissions) =>
            prevPermissions.map((section) => {
                if (section[sectionKey]) {
                    const updatedSection = {
                        ...section[sectionKey],
                        [permissionKey]: {
                            ...section[sectionKey][permissionKey],
                            roles: {
                                ...section[sectionKey][permissionKey].roles,
                                [role]: !section[sectionKey][permissionKey].roles[role],
                            },
                        },
                    };
                    return { [sectionKey]: updatedSection };
                }
                return section;
            })
        );
    };
    const [addPermissionDialog, SetAddPermissionDialog] = useState(false);
    const openAddPermissionDialog = () => SetAddPermissionDialog(true);
    const closeAddPermissionDialog = () => SetAddPermissionDialog(false);

    const addRole = () => {
        closeRoleDialog();
    }

    return (
        <div className="bg-[#f7f9ff] p-4">
            <div className=" py-2 flex justify-between text-2xl mb-8 border-2 border-[#f7f9ff] bg-white ">
                <h2 className="p-4 font-bold ">
                    Permission List <span className='text-gray-500 font-semibold'>(This component is not Functional but Reserved for Future use)</span>
                </h2>
                <button className="border border-black bg-white text-xl text-black hover:bg-black hover:text-white rounded-md my-3 flex items-center p-2" onClick={openAddPermissionDialog}> + Add Permission</button>
                {/* Modal */}
                {addPermissionDialog && (
                    <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 flex text-base justify-center items-center"
                        onClick={closeAddPermissionDialog} // Close on clicking the background
                    >
                        {/* Modal content */}
                        <div
                            className={`bg-white rounded shadow-lg w-96 absolute top-5
                                    }`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal header */}
                            <form >
                                <div className="flex justify-between items-center border-b px-4 py-2">
                                    <h2 className="text-2xl font-bold">Add Permission</h2>
                                    <button
                                        className="text-gray-600 hover:text-red-500 text-2xl"
                                        onClick={closeAddPermissionDialog}
                                    >
                                        &times;
                                    </button>
                                </div>

                                {/* Modal body */}

                                <div className="p-4 pb-0">
                                    <div className="mb-4">
                                        <label className="block text-gray-700">
                                            Permission Name <span className="text-red-500">*</span>
                                        </label>
                                        <input type="text" required
                                            className="w-full outline-none border-[2px] border-blue-100 rounded p-2 "
                                        />

                                    </div>

                                </div>
                                <div className="p-4 pt-0">
                                    <div className="mb-4">
                                        <label className="block text-gray-700">
                                            Parent Permission <span className="text-red-500">*</span>
                                        </label>
                                        <select required
                                            className="w-full outline-none border-[2px] border-blue-100 rounded p-2 "
                                        >
                                            <option value="-"> ---</option>
                                            <option value="role"> Role</option>
                                            <option value="permission"> Permission</option>
                                            <option value="customer"> Customer</option>
                                            <option value="riderequest"> Ride Request</option>
                                        </select>

                                    </div>

                                </div>

                                {/* Modal footer */}
                                <div className="flex justify-end p-4 border-t">
                                    <button
                                        type='submit'
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                        onClick={addRole}
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            {sections.map((section) => (
                <div key={section} className="mb-2 border-2 border-[#f7f9ff]">
                    {/* Toggle Section */}
                    <button
                        onClick={() => toggleSection(section)}
                        className="w-full bg-white px-4 py-4 rounded-md text-left font-semibold flex gap-2 items-center"
                    >
                        <span>
                            {collapsedSections[section] ? <FaAngleDoubleUp /> : <FaAngleDoubleDown />}
                        </span>
                        {section}{" "}
                    </button>

                    {/* Conditional Content */}
                    <div
                        className={` bg-white border rounded-md overflow-hidden transition-all duration-700 ease-in-out ${collapsedSections[section] ? "max-h-80 py-4 opacity-100" : "max-h-0 opacity-0"
                            }`}
                    >
                        {permissions.map((sectionPermissions, sectionIndex) =>
                            sectionPermissions[section.toLowerCase()] ? (
                                <div key={sectionIndex}>
                                    <table className="table-auto w-full text-center">
                                        <thead>
                                            <tr className="border-b-2 border-blue-100">
                                                <th className="px-4 py-2">Name</th>
                                                <th className="px-4 py-2">Admin</th>
                                                <th className="px-4 py-2">Driver</th>
                                                <th className="px-4 py-2">Rider</th>
                                                <th className="px-4 py-2">You</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.entries(sectionPermissions[section.toLowerCase()]).map(
                                                ([permissionKey, permissionData]) => (
                                                    <tr key={permissionKey}>
                                                        <td className="px-4 py-2 text-center">{permissionData.name}</td>
                                                        {Object.entries(permissionData.roles).map(([role, checked], idx) => (
                                                            <td key={idx} className="px-4 py-2">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={checked}
                                                                    onChange={() =>
                                                                        handleCheckboxChange(
                                                                            section.toLowerCase(),
                                                                            permissionKey,
                                                                            role
                                                                        )
                                                                    }
                                                                />
                                                            </td>
                                                        ))}
                                                    </tr>
                                                )
                                            )}
                                        </tbody>
                                    </table>
                                    <div className="flex justify-end">
                                        <button className="bg-white text-gray-500 px-3 py-2 rounded-md hover:bg-gray-500 hover:text-white border-gray-500 border-[1px] relative right-10">
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : null
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PermissionList;
