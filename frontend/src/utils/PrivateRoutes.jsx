import { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom'

const PrivateRoutes = () => {
    const accessToken = localStorage.getItem('access_token');
    const perfilInfo = localStorage.getItem('perfil_info');
    const [auth, setAuth] = useState(false)

    return (
        accessToken && perfilInfo ? (<Outlet />) : <Navigate to="/" />
    )
}

export default PrivateRoutes;