import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../pages/Books/LoginPage'
import Register from '../pages/Books/RegisterPage'
import Cart from '../pages/Books/CartPage'
import Checkout from '../pages/Books/Checkout'
import PrivateRoute from '../routers/PrivateRoute'

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
    }
])

export default router