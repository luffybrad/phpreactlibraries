import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
//import react-router-dom component
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; 
//import Articlelist file component
import Articlelist from './components/Articlelist';
//import Articleadd file component
import Articleadd from './components/Articleadd';
//import Articleedit file component
import Articleedit from './components/Articleedit';

import './App.css'

function App() {
  return (
    <div className="container">
      <h1>React + PHP Crud App by <span className="text-primary">luffybrad</span></h1>
      {/* set up application routing */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Articlelist/>}/>
          <Route path="/add" element={<Articleadd/>}/>
          <Route path="/edit/:article_id" element={<Articleedit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
