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
        <div>
            <form onSubmit={handleSubmit} className="bg-gray-200 rounded-lg p-8 max-w-sm ">
                <input 
                    className="mb-4 p-2 border border-gray-300 rounded" placeholder="email"
                    type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    className="mb-4 p-2 border border-gray-300 rounded" placeholder="password"
                    type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <input className="w-1/3 bg-green-500"
                    type="submit" value="Login" 
                />
            </form>
        </div>
    )

}

export default LoginForm
