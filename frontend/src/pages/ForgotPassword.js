import React, { useState } from 'react';
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate()

    const handleChange = (e) => {
        setEmail(e.target.value);
        if (error) {
            setError("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/v1/account/user/${email}/`);
            if (response.status === 200) {
                navigate('/reset-password')
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.error);
            } else {
                toast.error("An error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Forgot Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="appearance-none border w-full py-4 px-3 text-gray-600 text-sm leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={handleChange}
                        />
                        {error && <p className="text-red-500 text-xs italic">{error}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-8 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Fetching Account..." : "Search Account"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;