import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useSelector((state) => state.user);

    useEffect(() => {
        if (!isAuthenticated) {
            toast.error("You must log in to access first");
        }
    }, [isAuthenticated]);

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;