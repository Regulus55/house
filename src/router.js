import {createBrowserRouter} from "react-router-dom";
import {ForgotPassword, Login, Signup, Main} from "./components";




const router = createBrowserRouter([
    {
        path: '/',
        element: <Main/>,
    },
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