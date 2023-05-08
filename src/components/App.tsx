import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { myGlobalContext } from "../context/Context";
import {
  Login,
  Layout,
  Home,
  ViewModule,
  ViewRow,
  AddRow,
  ErrorPage,
} from "../pages";
import PrivateRoute from "../Utils/PrivateRoute";
import "../styles/reset.scss";

export default function App() {
  const [currentID, setID] = useState<string>("");
  const [currentName, setName] = useState<string>("");
  return (
    <myGlobalContext.Provider
      value={{ currentID, setID, currentName, setName }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Layout />}>
              <Route path="modules" element={<Home />} />
              <Route path=":module" element={<ViewModule />} />
              <Route path="row/:row" element={<ViewRow />} />
              <Route path="addRow/:module" element={<AddRow />} />
              <Route path="edit/:id" element={<AddRow />} />
            </Route>
          </Route>
          <Route path="/error" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </myGlobalContext.Provider>
  );
}
