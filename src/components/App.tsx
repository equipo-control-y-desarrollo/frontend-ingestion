import React from 'react';
import Login from '../pages/Login';
import Home from '../pages/Home';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layouts/LayoutVertical';
import ViewModule from '../pages/ViewModule';
import ViewRow from '../pages/ViewRow';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Layout/>}>
          <Route path="modules" element={<Home/>}/>
          <Route path=":module" element={<ViewModule/>}></Route>
          <Route path="row/:row" element={<ViewRow/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}