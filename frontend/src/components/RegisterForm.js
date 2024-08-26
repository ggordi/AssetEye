import React, { useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api_base } from '../constants';

const RegisterForm = () => {
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== password2) {
            setErrorMessage("Passwords do not match.");
            setSuccessMessage("")
            setPassword("")
            setPassword2("")
            return;
        }

        try {
            await axios.post(`${api_base}register/`, {
                email,
                username,
                password,
            });
            setSuccessMessage("Registration successful! Navigate to home to log in.")
            setErrorMessage("")
            setEmail("")
            setUsername("")
            setPassword("")
            setPassword2("")
        } catch {
            setErrorMessage("Registration failed. Please try again.");
            setSuccessMessage("");
            setEmail("")
            setUsername("")
            setPassword("")
            setPassword2("")
        }
    }


    return (

        <div>
            <form onSubmit={handleSubmit} className="bg-gray-200 rounded-lg p-8 max-w-sm" >
                <input 
                    className="mb-4 p-2 border border-gray-300 rounded"
                    type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                    placeholder="email" required 
                />
                <input 
                    className="mb-4 p-2 border border-gray-300 rounded"
                    type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} 
                    placeholder="your name here" required 
                />
                <input 
                    className="mb-4 p-2 border border-gray-300 rounded"
                    type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                    placeholder="password" required 
                />
                <input 
                    className="mb-4 p-2 border border-gray-300 rounded"
                    type="password" name="password2" value={password2} onChange={(e) => setPassword2(e.target.value)} 
                    placeholder="re-enter password" required 
                />
                <button
                    className="w-1/3 bg-green-500"
                    type="submit" value="Login" >
                    Register
                </button>
            </form>

            <div className="mt-4">
                {errorMessage && <p className="text-red-500 text-lg">{errorMessage}</p>}
                {successMessage && <p className="text-green-500 text-lg">{successMessage}</p>}
            </div>
        </div>

    )
}

export default RegisterForm