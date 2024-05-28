import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.png';
import '../layout/navbar.css'

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        
        <a className="navbar-brand">
          <Link to="/">
          <img src={logo} alt="Logo" />
          </Link>
        </a>

        
        {/* Navbar Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <Link className='btn btn-outline-light' to="/Signup/Signup">Sign Up</Link>
        </div>
      </nav>
    </div>
  );
}
