import { Outlet } from "react-router"
import Footer from "./Footer"
import { useDispatch } from "react-redux"
import { removeUser } from "../utils/userSlice";
import { Link } from "react-router";
import { useNavigate } from "react-router";

const Navbar = () => {

    const dispatch = useDispatch();

    const logoutUser = () => {
        dispatch(removeUser());
    }
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutUser(); // clear cookie / redux state / whatever
        navigate("/login", { replace: true });
    };
    return (
        <div className="flex flex-col min-h-screen">
            <div className="navbar bg-base-300 border-base-300">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Tinders</a>
                </div>
                <div className="flex gap-2">
                    <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img
                            alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                        <a className="justify-between">
                            Profile
                            <span className="badge">New</span>
                        </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li>
                            <Link onClick={handleLogout}>Logout</Link>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
        </div>
)}

export default Navbar