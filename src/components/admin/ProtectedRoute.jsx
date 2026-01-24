import { Navigate, Outlet } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';

const ProtectedRoute = () => {
    const { user, loading } = useAdmin();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
