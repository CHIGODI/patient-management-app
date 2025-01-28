import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { userId } = useParams();
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: ""
    });
    const [error, setError] = useState({});
    const [submit, setSubmit] = useState('Submit');

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
        let errors = {};

        if (!formData.newPassword) {
            errors.newPassword = "New Password is required";
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = "Confirm Password is required";
        }

        if (formData.newPassword !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/v1/account/${userId}/`, {
                password: formData.newPassword
            });
            if (response.status === 200) {
                toast.success("Password changed successfully");
                setSubmit('Submit');
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(error.response.data.detail);
            } else {
                toast.error("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                            New Password
                        </label>
                        <input
                            className="appearance-none border w-full py-4 px-3 text-gray-600 text-sm leading-tight focus:outline-none focus:shadow-outline"
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            placeholder="Enter new password"
                            value={formData.newPassword}
                            onChange={handleChange}
                        />
                        {error.newPassword && <p className="text-red-500 text-xs italic">{error.newPassword}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            className="appearance-none border w-full py-4 px-3 text-gray-600 text-sm leading-tight focus:outline-none focus:shadow-outline"
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Confirm new password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        {error.confirmPassword && <p className="text-red-500 text-xs italic">{error.confirmPassword}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-8 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            {submit}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;