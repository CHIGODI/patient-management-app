import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessToken, clearUser } from "../../redux/userSlice";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { access, refresh } = useSelector((state) => state.user);

    const isTokenValid = (token) => {
        try {
            const { exp } = jwtDecode(token);
            return Date.now() < exp * 1000;
        } catch (error) {
            return false;
        }
    };

    useEffect(() => {
        const checkAndRefreshToken = async () => {
            if (access && isTokenValid(access)) {
                return;
            }

            if (refresh && isTokenValid(refresh)) {
                try {
                    await dispatch(refreshAccessToken(refresh)).unwrap();
                } catch (error) {
                    dispatch(clearUser());
                }
            } else {
                dispatch(clearUser());
            }
        };

        checkAndRefreshToken();
    }, [access, refresh, dispatch]);

    if (!access) {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;
