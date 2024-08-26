import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    return (
        <div>
            <h1>Login Here:</h1>
            <LoginForm />
        </div>
    );
}

export default LoginPage