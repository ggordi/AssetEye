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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
                <input
                    className="mb-4 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    className="mb-4 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your Name"
                    required
                />
                <input
                    className="mb-4 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <input
                    className="mb-4 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    name="password2"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="Re-enter Password"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors duration-300"
                >
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