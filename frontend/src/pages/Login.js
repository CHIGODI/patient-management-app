import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();

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

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
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

        if (Object.keys(errors).length > 0) {
            setError(errors);
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/v1/account/login/", formData);
            if (response.status === 200) {
                dispatch(setUser({ user: response.data.user, access: response.data.access, refresh: response.data.refresh }));
                console.log("User logged in successfully");
                navigate('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    {['email', 'password'].map((field) => (
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
                                    type={field === 'password' && !showPassword ? 'password' : 'text'}
                                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                    value={formData[field]}
                                    onChange={handleChange}
                                />
                                {field === 'password' && (
                                    <span
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                                        onClick={handleTogglePassword}
                                    >
                                        <FontAwesomeIcon className='text-gray-600 text-xs' icon={showPassword ? faEyeSlash : faEye} />
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
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;