import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { RouterProvider } from 'react-router-dom'
import router from './routers/router.jsx'
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </Provider >
)