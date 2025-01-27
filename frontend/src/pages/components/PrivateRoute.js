import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetLogout } from "../../redux/userSlice";

const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { isAuthenticated, justLoggedOut } = useSelector((state) => state.user);

    useEffect(() => {
        if (justLoggedOut) {
            dispatch(resetLogout());
        }
    }, [isAuthenticated, justLoggedOut, dispatch]);

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;