import {createBrowserRouter} from "react-router-dom";
import {ForgotPassword, Login, Signup, Main, Profile, CreateProfile} from "./components";




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
        path: '/create/profile',
        element: <CreateProfile />
    }
])

export default router;