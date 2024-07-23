import {createBrowserRouter} from "react-router-dom";
import {ForgotPassword, Login, Signup, Main, Profile, Privacy, ViewPrivacy, ChangePassword} from "./components";




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
    },
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/privacy',
        element: <Privacy />
    },
    {
        path: '/view/privacy',
        element: <ViewPrivacy/>
    },
    {
        path: '/change/password',
        element: <ChangePassword/>
    }
])

export default router;