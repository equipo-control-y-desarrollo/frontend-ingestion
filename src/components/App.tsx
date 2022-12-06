import React from 'react';
import Login from '../pages/Login';
import Home from '../pages/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
      </Routes>
    </BrowserRouter>
  );
}