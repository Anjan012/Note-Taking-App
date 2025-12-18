import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
    const jwt = localStorage.getItem("jwt");

    // If no token → redirect to login
    if (!jwt) {
        return <Navigate to="/login" replace />;
    }

    // If token exists → allow access to the child route
    return <Outlet />;
};

export default ProtectedRoute;