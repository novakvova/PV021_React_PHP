import React from 'react';
import HomePage from './components/home';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import LoginPage from './components/auth/login'
import HomeLayout from './components/containers/homeLayout';
import './App.css';

const  App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout/>}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        {/* <Route path="*" element={<NoMatch />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
