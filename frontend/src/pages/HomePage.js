import Header from "../components/Header";
import AuthContext from "../context/AuthContext";
import React, { useContext } from 'react';

const HomePage = () => {
  const { authTokens } = useContext(AuthContext);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center p-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=3872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <Header />

      <div className="text-center mb-72">
        <h1 className="text-8xl font-bold text-white mb-6 mt-36">Asset Eye</h1>
        <p className="text-3xl font-semibold text-white mb-8  mx-auto">
          Your one stop shop for the information you need to make educated
          investment decisions.
        </p>

        {authTokens ? (
          <div className="space-x-12 mt-24">
            <a
              href="/explore"
              className="px-6 py-3 bg-black text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-800 transition duration-300"
            >
              Explore
            </a>
          </div>
        ) : (
          <div className="space-x-12 mt-24">
            <a
              href="/login"
              className="px-6 py-3 bg-black text-white font-semibold text-lg rounded-lg shadow-md hover:bg-blue-800 transition duration-300"
            >
              Login
            </a>
            <a
              href="/register"
              className="px-6 py-3 bg-black text-white font-semibold text-lg rounded-lg shadow-md hover:bg-green-600 transition duration-300"
            >
              Register
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
