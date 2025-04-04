import { Navigate } from "react-router";

const AdminRoute = ( { children } ) => {
    const token = localStorage.getItem('token');
    if( !token ) return <Navigate to="/admin" />;
    return children;
};

export default AdminRoute;