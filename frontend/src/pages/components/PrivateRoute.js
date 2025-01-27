import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { resetLogout } from "../../redux/userSlice"
import 'react-toastify/dist/ReactToastify.css';

const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, justLoggedOut } = useSelector((state) => state.user);

    useEffect(() => {
        if (!isAuthenticated && !justLoggedOut) {
            toast.error("You must log in to access first");
        }

        if (justLoggedOut) {
            dispatch(resetLogout());
        }
    }, [isAuthenticated, justLoggedOut, dispatch]);

    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;