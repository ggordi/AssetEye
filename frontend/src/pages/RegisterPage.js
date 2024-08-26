import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
    return (
        <div>
            <h1>Register Here:</h1>
            <RegisterForm />
        </div>
    );
}

export default RegisterPage