import React from 'react';
import logo from './logo.svg';
import './App.css';
import { SignIn } from './components/Signup';
import { Route, Routes,BrowserRouter } from 'react-router-dom';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
        <Routes>
          <Route path="/" element={ <SignIn/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
