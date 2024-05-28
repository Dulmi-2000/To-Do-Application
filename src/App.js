import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React from 'react'
import './App.css';
import Navbar from './layout/Navbar';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Home from './pages/home';
import Addtodo from './pages/addTodo'
import EditTodo from './pages/editTodo';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/addtodo" element={<Addtodo />} />
          <Route path="/" element={<Home />} />
          <Route path="/editTodo/:id" element={<EditTodo />} />
          <Route path='/Login/Login' element={<Login />}></Route> 
          <Route path='/Signup/Signup' element={<Signup />}></Route> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
