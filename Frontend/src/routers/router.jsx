import { createBrowserRouter } from 'react-router-dom'
import App from '../App'

import Login from '../pages/Books/LoginPage'
import Register from '../pages/Books/RegisterPage'
import Cart from '../pages/Books/CartPage'
import Checkout from '../pages/Books/Checkout'
import Orders from '../pages/Books/OrdersPage'
import AdminPage from '../pages/Books/AdminPage'

import PrivateRoute from '../routers/PrivateRoute'
import AdminRoute from './AdminRoute'

import Dashboard from '../pages/Dashboard/Dashboard'
import AddNewBook from '../pages/Dashboard/AddNewBook'

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
        element: <AdminRoute> <Dashboard /> </AdminRoute>
    },
    {
        path: '/dashboard/add-new-book',
        element: <AddNewBook />
    },
    {
        path: '/dashboard/edit-book/:id',
        element: <div>EditBook</div>
    }
])

export default router