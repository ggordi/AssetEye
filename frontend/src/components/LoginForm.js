import React, { useContext, useState }  from 'react';
import AuthContext from '../context/AuthContext';

const LoginForm = () => {
    const { loginUser } = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleSubmit = async (e) => {
        e.preventDefault()  // prevent page refresh

        try {
            await loginUser(e.target.email.value, e.target.password.value)
            console.log('login success')
        } catch {
            setEmail('')
            setPassword('')
            console.log('login failed')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <input
                    className="mb-4 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="mb-4 p-3 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                    Login
                </button>
            </form>
        </div>
    );

}

export default LoginForm
