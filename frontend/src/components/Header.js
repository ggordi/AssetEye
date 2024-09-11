import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {
    const { authTokens, logoutUser } = useContext(AuthContext);

    return (
        <header className="p-4 font-song text-white fixed top-0 left-0 w-full mt-4" style={{ zIndex: 2000 }}>
            <nav className="flex items-center justify-between">
                <h1 className="font-bold text-2xl ml-32">
                    <Link to="/" className="text-white hover:text-gray-300">Asset Eye</Link>
                </h1>
                <ul className="flex space-x-16 mr-72 text-2xl">
                    <li>
                        <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                    </li>
                    {authTokens ? 
                        <>
                            <li>
                                <Link to="/explore" className="text-white hover:text-gray-300">Explore</Link>
                            </li>
                            <li>
                                <Link to="/dashboard" className="text-white hover:text-gray-300">Watchlist</Link>
                            </li>
                            <li>
                                <a
                                    href="/"
                                    onClick={logoutUser} // Add the onClick handler here
                                    className="text-white hover:text-gray-300 cursor-pointer"
                                >
                                    Logout
                                </a>
                            </li>
                        </>
                        : 
                        <li>
                           
                        </li>
                    }
                </ul>
            </nav>
        </header>
    );
}

export default Header;