import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router';
import axios from 'axios';
import { addUser, removeUser } from '../utils/userSlice'; // Make sure removeUser is available if needed

const ProtectedRoute = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const [isCheckingSession, setIsCheckingSession] = useState(true);

    useEffect(() => {
        const checkUserSession = async () => {
            if (user) {
                setIsCheckingSession(false);
                return;
            }

            try {
                // Attempt to fetch user profile to check for an active session via cookie
                const response = await axios.get('http://localhost:3000/profile/view', { withCredentials: true });
                const userObject = response?.data?.[0] ?? null

                if (userObject) {
                    dispatch(addUser(userObject));
                } else {
                    dispatch(removeUser());
                }
            } catch (error) {
                console.log("Session check failed or no active session:", error);
                dispatch(removeUser()); // Ensure user state is cleared
            } finally {
                setIsCheckingSession(false);
            }
        };

        checkUserSession();
    }, [dispatch, user]);

    if (isCheckingSession) {
        return <div>Loading session...</div>; // Or your preferred loading component
    }

    if (!user) {
        // After checking session, if user is still not present, then redirect.
        return <Navigate to="/login" replace />;
    }

    // User is authenticated (either was already in store or fetched successfully)
    return <Outlet />; // This will render <App />
};

export default ProtectedRoute;