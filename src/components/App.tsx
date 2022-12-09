import React from 'react';
import Login from '../pages/Login';
import Home from '../pages/Home';
import {BrowserRouter, Routes, Route } from "react-router-dom";
import ModulesMenu from './ModulesMenu';
import Layout from './Layouts/LayoutVertical';
import ViewModule from '../pages/ViewModule';


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/home" element={<Layout/>}>
          <Route path="modules" element={<ModulesMenu/>}/>
          <Route path=":module" element={<ViewModule/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}