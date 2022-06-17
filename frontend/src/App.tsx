import React from 'react';
import HomePage from './components/home';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import LoginPage from './components/auth/login'
import HomeLayout from './components/containers/homeLayout';
import './App.css';
import RegisterPage from './components/auth/register';

const  App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout/>}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
