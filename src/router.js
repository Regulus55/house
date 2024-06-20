import {createBrowserRouter} from "react-router-dom";
import {ForgotPassword, Login, Signup} from "./components";




const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/forgot/password',
        element: <ForgotPassword/>
    },
    {
        path: '/signup',
        element: <Signup/>
    }
])

export default router;