import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Login from '../pages/Books/LoginPage'
import Register from '../pages/Books/RegisterPage'
import Cart from '../pages/Books/CartPage'

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
    }
])

export default router