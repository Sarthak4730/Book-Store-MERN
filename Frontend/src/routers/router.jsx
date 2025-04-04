import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../pages/Books/LoginPage'
import Register from '../pages/Books/RegisterPage'
import Cart from '../pages/Books/CartPage'
import Checkout from '../pages/Books/Checkout'
import PrivateRoute from '../routers/PrivateRoute'
import Orders from '../pages/Books/OrdersPage'
import AdminRoute from './AdminRoute'
import AdminPage from '../pages/Books/AdminPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/cart',
        element: <Cart />
    },
    {
        path: '/checkout',
        element: <PrivateRoute> <Checkout /> </PrivateRoute>
    },
    {
        path: '/orders',
        element: <Orders />
    },

    {
        path: '/admin',
        element: <AdminPage />
    },
    
    {
        path: '/dashboard',
        element: <AdminRoute> <div>Dashboard</div> </AdminRoute>,
        children: [
            {
                path: 'add-new-book',
                element: <div>AddNewBook</div>
            },
            {
                path: 'edit-book/:id',
                element: <div>EditBook</div>
            },
            {
                path: 'manage-books',
                element: <div>ManageBooks</div>
            },
        ]
    }
])

export default router