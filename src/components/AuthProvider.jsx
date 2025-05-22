import useAuthInitialization from "../hooks/useAuthInitialization";

const AuthProvider = ({ children }) => {
    const { initialized } = useAuthInitialization();

    if (!initialized) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div>Loading...</div>
            </div>
        );
    }

    return children;
}

export default AuthProvider