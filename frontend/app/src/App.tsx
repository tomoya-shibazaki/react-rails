import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Main from "./Main"
import Edit from "./Edit"


const App = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="edit/:id" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
