
import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../contexts/AuthContext';

export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <p>Checking your session...</p>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
