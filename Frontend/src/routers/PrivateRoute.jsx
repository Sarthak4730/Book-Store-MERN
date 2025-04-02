import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ( { children } ) => {
    const { currentUser } = useAuth();

    // if(loading) return <h1>PrivateRoute Loading...</h1>

    if(currentUser) return children;

    return <Navigate to="/login"/>;
}

export default PrivateRoute;