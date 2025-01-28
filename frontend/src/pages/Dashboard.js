import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from "./components/NavBar";
import SideNav from "./components/SideNav";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import { setUser } from '../redux/userSlice';
import axios from 'axios';

const Dashboard = () => {
    const dispatch = useDispatch();
    const { user, access, refresh } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        username: user?.username || "",
        email: user?.email || "",
        phone: user?.phone || "",
    });
    const [error, setError] = useState({});
    const [activeTab, setActiveTab] = useState("My Details");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (error[name]) {
            setError({
                ...error,
                [name]: ""
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.username === user.username && formData.phone === user.phone) {
            toast.info("No changes made");
            setActiveTab("My Details");
            return;
        }
        let errors = {};

        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            }
        });

        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/v1/account/update/${user.id}/`, formData, {
                headers: {
                    "Authorization": `Bearer ${access}`,
                }
            });
            if (response.status === 200) {
                toast.success("User details updated successfully");
                dispatch(setUser({
                    user: response.data,
                    access,
                    refresh,
                }));
                setActiveTab("My Details");
            }
        } catch (error) {
            if (error.response.data) {
                setError(error.response.data);
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case "My Details":
                return (
                    <div className="p-4 bg-white rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-600 mb-4">My Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Username</label>
                                <p className="text-gray-800 bg-gray-100 p-2 rounded">{user.username}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Email Address</label>
                                <p className="text-gray-800 bg-gray-100 p-2 rounded">{user.email}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Phone</label>
                                <p className="text-gray-800 bg-gray-100 p-2 rounded">{user.phone}</p>
                            </div>
                        </div>
                    </div>
                );
            case "Edit My Details":
                return (
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="border px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm"
                                />
                                {error.username && <p className="text-red-500 text-xs italic">{error.username}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="border px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm"
                                />
                                {error.phone && <p className="text-red-500 text-xs italic">{error.phone}</p>}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-6 bg-indigo-500 text-white text-sm px-6 py-2 hover:bg-indigo-600"
                        >
                            Save Changes
                        </button>
                    </form>
                );
            default:
                return <p className="text-gray-600">Select a tab to view its content.</p>;
        }
    };

    return (
        <div className="min-h-screen">
            <NavBar />
            <SideNav />

            {/* Main Content */}
            <div className="fixed w-full lg:w-[80%] h-[calc(100%-70px)] right-0">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-2xl text-gray-700 pt-4 pl-4">Hello {user.username}👋🏽</h2>
                </div>

                {/* Content Section */}
                <div className="h-full shadow-sm overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full
                                    scrollbar-track-gray-100 scrollbar-thumb-gray-400 bg-white p-6">

                    {/* Tabs Section */}
                    <div className="flex flex-row gap-6 border-b border-gray-200 pb-4">
                        {["My Details", "Edit My Details"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-2 font-medium ${activeTab === tab
                                    ? "text-gray-700 border-b-2 border-indigo-500"
                                    : "text-gray-500 hover:text-gray-700"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                    {/* Tab Content */}
                    <div className="mt-6">{renderContent()}</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;