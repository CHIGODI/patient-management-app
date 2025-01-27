import React, { useState } from 'react';
import axios from "axios";

const SignUp = () => {
    const [error, setError] = useState({});
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear the error for the specific field being updated
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

        // Check for required fields
        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            }
        });

        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
        if (formData.phone.length !== 10) {
            errors.phone = "Phone number must be 10 digits";
        }
        if (formData.password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }

        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/v1/account/register/", formData);
            if (response.status === 201) {
                console.log("User registered successfully");
            }
        } catch (error) {
            console.log(error.response.data);
            setError(error.response.data);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Create Account</h2>
                <form onSubmit={handleSubmit}>
                    {['username', 'email', 'phone', 'password', 'confirmPassword'].map((field) => (
                        <div className="mb-4" key={field}>
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                                <span className="text-red-500">*</span>
                            </label>
                            <input
                                className="appearance-none border w-full py-4 px-3 text-gray-600 text-sm leading-tight focus:outline-none focus:shadow-outline"
                                id={field}
                                name={field}
                                type={field === 'password' || field === 'confirmPassword' ? 'password' : 'text'}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={formData[field]}
                                onChange={handleChange}
                            />
                            {error[field] && <p className="text-red-500 text-xs italic">{error[field]}</p>}
                        </div>
                    ))}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;