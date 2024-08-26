import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import RegisterForm from '../components/RegisterForm';

const RegisterPage = () => {
    return (
        <div>
            <RegisterForm />
        </div>
    );
}

export default RegisterPage