import { useDispatch, useSelector } from "react-redux"
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";

const useAuthInitialization = () => {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const [initialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initializeAuth = async () => {
            // If user in store, bounce
            if (user) {
                setIsInitialized(true);
                return
            }

            try {
                const response = await axios.get('http://localhost:3000/profile/view', {
                    withCredentials: true
                });

                const userObject = response?.data?.[0] ?? null;

                if (userObject) {
                    dispatch(addUser(userObject));
                } else {
                    dispatch(removeUser());
                }
            } catch (error) {
                console.log('Unknown error occurred', error)
            }  finally {
                setIsInitialized(true);
            }
        }
        initializeAuth();
    }, [dispatch, user])

    return {
        initialized,
        user
    }
}

export default useAuthInitialization