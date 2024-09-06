import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const DashboardPage =() => {
    
    const { user } = useContext(AuthContext)
    console.log(user)

    return (
        <div>
            <h1 className="text-center text-3xl py-5">Hi, {user.username} </h1>
        </div>
    )
}

export default DashboardPage