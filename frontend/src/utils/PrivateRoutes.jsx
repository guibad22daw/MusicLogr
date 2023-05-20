import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const accessToken = localStorage.getItem('access_token');

    return (
        accessToken ? (<Outlet />) : <Navigate to="/" />
    )
}

export default PrivateRoutes;