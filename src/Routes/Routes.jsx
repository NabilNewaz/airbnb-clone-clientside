import { createBrowserRouter, Navigate } from "react-router-dom"
import Layout from "../Layout/Layout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                path: '/',
                element: <Navigate to="/" />
            },
            {
                path: '/category/:category_id',
                element: <Navigate to="/" />
            }
        ],
    }
])

export default router;