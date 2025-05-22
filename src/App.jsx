import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useDispatch } from "react-redux";

function App() {

    const dispatch = useDispatch();
    const fetchUser = async () => {
        try {
            axios.get('http://localhost:3000/profile/view', {withCredentials: true})
            .then((response) => {
                const userObject = response?.data[0];
                dispatch(userObject)
            })
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
      fetchUser()
    }, [])

    const user = useSelector((store) => store.user);
    const userName = user?.firstName ?? 'friend';

    return (
      <div className="px-6">
        <h2>Welcome back, {userName} !</h2>
      </div>
    )
}

export default App
