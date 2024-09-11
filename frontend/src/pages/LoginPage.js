import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";

const LoginPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center p-8"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=3872&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <Header />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
