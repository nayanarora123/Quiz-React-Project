import React from "react";
import './components/assets/css/style.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from "./components/quiz";
import Result from './components/result';
import Bank from "./components/bank";
import Add from './components/add';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Quiz />} />
        <Route path="/:questionNo" element={<Quiz />} />


        <Route path="/add" element={<Add />} />

        <Route path="/result" element={<Result />} />

        <Route path="/bank" element={<Bank />} /> 
        <Route path="/bank/:id" element={<Bank />} /> 

      </Routes>
    </Router>
  );
}

export default App;
