import { createBrowserRouter } from "react-router-dom"
import Layout from "../Layout/Layout";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout></Layout>,
        children: [
            {
                path: '/',
                element: <Layout></Layout>
            },
            {
                path: '/category/:category_id',
                element: <Layout></Layout>
            },
            {
                path: '/search',
                element: <Layout></Layout>
            }
        ],
    }
])

export default router;