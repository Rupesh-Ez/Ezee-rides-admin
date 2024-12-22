import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import axios from 'axios'
import BACKEND_API_ENDPOINT from '../utils/constants.js'

const Terms = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchTerms = async () => {
                   
            try {
                const response = await axios.get(
                    `${BACKEND_API_ENDPOINT}/api/terms/getterms`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true,
                    }
                );
                if (response.data.success) {
                    setContent(response.data.data.terms)
                }
            } catch (error) {
                alert('An error occurred while fetching terms');
            }
        };
    
        fetchTerms();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            const payload = {terms:content}
            const res = await axios.post(`${BACKEND_API_ENDPOINT}/api/terms/saveterms`, payload, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
              });
            if (res.data.success) {
              alert(res.data.message || "terms saved Successfully ;)");
            } else {
              alert(res.data.message || "failure");
            }
          } catch (error) {
            alert(error.response?.data?.message || "An unexpected error occurred");
          } 
      
    };
    return (
        <div className="flex overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <div className="p-6 bg-[#f7f9ff]">
                    <div className="flex flex-col gap-2">
                        <div className="px-4 border-b-2 border-blue-100 bg-white">
                            <h2 className="text-3xl py-4 font-semibold px-2">Terms and Conditions </h2>
                        </div>
                        <div className="bg-white">
                            <div className="h-[400px] overflow-hidden mb-2">
                                <ReactQuill
                                    value={content}
                                    onChange={setContent}
                                    modules={{
                                        toolbar: [
                                            [{ header: [1, 2, 3, false] }],
                                            ["bold", "italic", "underline"],
                                            [{ list: "ordered" }, { list: "bullet" }],
                                            ["link"],
                                            ["clean"],
                                        ],
                                    }}
                                    className="h-[350px] bg-white"
                                    placeholder="Write your terms and conditions here..."
                                />
                            </div>
                            <div></div>
                            <button
                                onClick={handleSave}
                                className="bg-[#007BFF] text-white rounded cursor-pointer p-3 mx-2"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Terms