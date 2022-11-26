import React from "react";
import './components/assets/css/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Form from "./components/form";
import Result from './components/result';
import Bank from "./components/bank";
import Add from './components/add';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/add" element={<Add />} />
        <Route path="/" element={<Form />} />
        <Route path="/result" element={<Result />} />  
        <Route path="/bank" element={<Bank />} /> 

      </Routes>
    </Router>
  );
}

export default App;
