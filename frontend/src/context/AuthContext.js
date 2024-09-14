import { createContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api_base } from '../constants'; 

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
    let [user, setUser] = useState(localStorage.getItem("authTokens") ? jwtDecode(localStorage.getItem("authTokens")) : null)
    let [authTokens, setAuthTokens] = useState(localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null)

    let navigate = useNavigate()

    let loginUser = async (email, password) => {
        try {
            let response = await axios.post(`${api_base}token/`, { email, password });
            setAuthTokens(response.data);
            setUser(jwtDecode(response.data.access));
            localStorage.setItem("authTokens", JSON.stringify(response.data));
            navigate("/explore");  // when the user is logged in, navigate them to their dashboard
        } catch (error) {
            console.error("Login failed:", error); // Log the error
            navigate("/login"); // Navigate back to login on failure
            throw(error)  // handled by frontend to clear form
        }
    }

    
    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem("authTokens")
        navigate("/")
    }

    let updateToken = async () => {
        console.log("auth tokens currently ", authTokens)
        console.log("refresh token currently ", authTokens.refresh)
        try {
            const response = await axios.post(`${api_base}token/refresh/`, { refresh: authTokens?.refresh }, {
                headers: {
                    'Content-Type': 'application/json' // Ensure this header is set
                }
            });
            const newAccess = response.data.access
            // retain the refresh token, update the access token
            setAuthTokens((prevTokens) => ({
                ...prevTokens,
                access: newAccess
            }))

            setUser(jwtDecode(newAccess))
            localStorage.setItem("authTokens", JSON.stringify({
                ...authTokens,
                access: newAccess
            }));
        } catch {
            logoutUser()
        }
    }
    
    useEffect(() => {
        let interval =  setInterval(()=> {
            if (authTokens) {
                updateToken()
            }
        }, 1000 * 240)
        return ()=> clearInterval(interval)
    }, [authTokens])

    let contextData = {
        user: user,
        authTokens: authTokens,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    return (
        <AuthContext.Provider value={contextData}>
            { children }
        </AuthContext.Provider>
    )
}