import { useState, useEffect } from "react"
import axios from "axios"

const useAuth = () => {
    const code = new URLSearchParams(window.location.search).get('code');
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        (async () => {
            try {
                const { data: { access_token, refresh_token, expires_in } } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, { code })
                setAccessToken(access_token)
                setRefreshToken(refresh_token)
                setExpiresIn(expires_in)
            } catch(err) {
                console.error(err)
            }
        })()
    }, [code])

    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(async () => {
            try {
                const {
                    data: { access_token, expires_in },
                } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/refresh`, {
                    refreshToken,
                })
                setAccessToken(access_token)
                setExpiresIn(expires_in)
            } catch(err) {
                console.error(err)
            }
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    return accessToken
}

export default useAuth