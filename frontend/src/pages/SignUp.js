import React, { useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link, } from "react-router-dom";
import { toast } from 'react-toastify';


const SignUp = () => {
    const navigate = useNavigate()
    const [error, setError] = useState({});
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });

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

    const handleTogglePassword = (field) => {
        setShowPassword({
            ...showPassword,
            [field]: !showPassword[field]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = {};

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
                toast.success("User registered successfully");
                navigate('/')
            }
        } catch (error) {
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
                            <div className="relative">
                                <input
                                    className="appearance-none border w-full py-4 px-3 text-gray-600 text-sm leading-tight focus:outline-none focus:shadow-outline"
                                    id={field}
                                    name={field}
                                    type={(field === 'password' || field === 'confirmPassword') && showPassword[field] ? 'text' : 'password'}
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    value={formData[field]}
                                    onChange={handleChange}
                                />
                                {(field === 'password' || field === 'confirmPassword') && (
                                    <span
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                        onClick={() => handleTogglePassword(field)}
                                    >
                                        <FontAwesomeIcon
                                            className='text-gray-600 text-xs'
                                            icon={showPassword[field] ? faEye : faEyeSlash}
                                        />

                                    </span>
                                )}
                            </div>
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
                <div className="mt-4 text-center">
                    <p className="text-gray-600 text-sm">
                       Already have an account? <Link to="/" className="text-blue-500 hover:text-blue-700">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;