import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
    return (
        <div>
            <LoginForm />
        </div>
    );
}

export default LoginPage