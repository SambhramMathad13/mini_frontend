import api from "./Axios.js";
import { jwtDecode } from "jwt-decode";
import React from 'react'
import { useState, useEffect } from "react";
import { Outlet, Navigate } from 'react-router-dom'

function ProtectedRoutes() {
    const [isAuth, setisAuth] = useState(null)
    useEffect(() => {
        check()
    }, [])

    async function refresh() {
        const refreshToken = localStorage.getItem('refresh')

        try {
            const res = await api.post('/api/refreshtoken',
                { refresh: refreshToken })
            if (res.status === 200) {
                localStorage.setItem('access', res.data.access)
                setisAuth(true)
            } else {
                setisAuth(false)
            }
        } catch (error) {
            console.log(error);
            setisAuth(false);
        }

    }
    async function check() {
        const token = localStorage.getItem('access')
        // console.log(token)
        if (token==null) {
            setisAuth(false)
        }
        else{
            const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;
        if (now > tokenExpiration) {
            console.log("tokenExpiration")
            await refresh()
        }
        else {
            // console.log("done")
            setisAuth(true)
        }
        }
        
    }
    if (isAuth === null) {
        return <div>Loading...</div>;
    }

    return isAuth ? (<Outlet/>) : <Navigate to="/register" />;
}

export default ProtectedRoutes