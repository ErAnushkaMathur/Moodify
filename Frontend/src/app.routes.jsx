import {createBrowserRouter} from "react-router-dom";
import Register from "./features/auth/pages/Register";
import Login from "./features/auth/pages/login";

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/",
        element: <Protected><h1>Home</h1></Protected>
    },
    {
        path: "/register",
        element: <Register />
    }
]);

export {router};