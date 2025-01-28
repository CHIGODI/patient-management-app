import React, { useState } from 'react';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [ login, setLogin ] = useState('Login');
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
        setLogin('Logging in...');

        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            }
        });

        if (Object.keys(errors).length > 0) {
            setError(errors);
            setLogin('Login');
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/v1/account/login/", formData);
            if (response.status === 200) {
                dispatch(setUser({ user: response.data.user, access: response.data.access, refresh: response.data.refresh }));
                toast.success("logged in successfully");
                setLogin('Login');
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response.data) {
            toast.error(error.response.data.detail);
            } else{
                toast.error("An error occurred. Please try again later.");
            }
            setLogin('Login');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Welcome Back!</h2>
                <p className="font-bold text-center text-blue-500 mb-6">Login</p>
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
                                        <FontAwesomeIcon className='text-gray-600 text-xs' icon={showPassword ? faEye : faEyeSlash} />
                                    </span>
                                )}
                            </div>
                            {error[field] && <p className="text-red-500 text-xs italic">{error[field]}</p>}
                        </div>
                    ))}
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-8 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            {login}
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-gray-600 text-sm">
                        Don't have an account? <Link to="/signup" className="text-blue-500 hover:text-blue-700">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;