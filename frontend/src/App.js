import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import HomePage from './pages/HomePage'
import PrivateRoute from './components/PrivateRoute'
import ExplorePage from './pages/ExplorePage'



const App = () => {
    return (
        <BrowserRouter>
            
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                    </Route>
                    {/* make this below a private route eventually  */}
                    <Route path="/explore" element={<ExplorePage />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};

export default App;
