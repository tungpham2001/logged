import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './component/NavBar';
import Home from './page/Home';
import Profile from './page/Profile';
import LogBoard from './page/LogBoard';
import Setting from './page/Setting';
import { FullNameProvider } from './FullNameContext';

const App = () => {
  return (
    <FullNameProvider>
      <BrowserRouter>
        <NavBar>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/log" element={<LogBoard />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </NavBar>
      </BrowserRouter>
    </FullNameProvider>
  );
};

export default App;