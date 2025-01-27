import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SideNav from "./components/SideNav";
import NavBar from "./components/NavBar";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";

const Dashboard = () => {
    const { user } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        phone : user.phone,
    });
    const [error, setError] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            toast.error("You cannot edit this field");
            return;
        }
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
            const response = await axios.put(`http://127.0.0.1:8000/api/v1/account/update/${user.id}`, formData);
            if (response.status === 200) {
                toast.success("User details updated successfully");
            }
        } catch (error) {
            if (error.response.data) {
            setError(error.response.data);
            } else {
                toast.error("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="min-h-screen">
            <NavBar />
            <SideNav />

            {/* Main Content */}
            <div className="fixed w-[100%] lg:w-[80%] h-[calc(100%-70px)] right-0">
                <div className="flex justify-between items-center">
                    <h2 className="font-bold text-2xl text-gray-700 pt-4 pl-4">Hello {user.username}👋🏽</h2>
                </div>
                <div className="h-full shadow-sm overflow-y-scroll scrollbar-thin scrollbar-thumb-rounded-full
                                    scrollbar-track-gray-100 scrollbar-thumb-gray-400 bg-white p-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-600">My Details</h3>
                        <p className="text-sm text-gray-500 mt-2">
                            Manage your personal information here.
                        </p>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    name="lastName"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="border px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm"
                                />
                                {error.lastName && <p className="text-red-500 text-xs italic">{error.lastName}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="border px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm"
                                />
                                {error.firstName && <p className="text-red-500 text-xs italic">{error.firstName}</p>}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-600">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="border px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-sm"
                                />
                                {error.lastName && <p className="text-red-500 text-xs italic">{error.lastName}</p>}
                            </div>
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="mt-6 bg-indigo-500 text-white text-sm px-6 py-2 hover:bg-indigo-600"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;