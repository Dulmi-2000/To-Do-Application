import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import coverh from '../../Assets/signupimg.jpg'

export default function Login() {

    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if the email exists
            const usernameResponse = await axios.get(`http://localhost:8080/email/${email}`);
            const existingUser = usernameResponse.data;

            if (existingUser) {
                // User exists, check password
                if (existingUser.password === password) {
                    // Passwords match, navigate to home page
                    navigate("/");
                } else {
                    // Incorrect password
                    setErrMsg('Incorrect password. Please try again.');
                }
            } else {
                // User not found, link to sign up
                setErrMsg('User not found. Please sign up.');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle errors here
        }
    };

    return (
        <div className='imgcov col-12' style={{ backgroundImage: `url(${coverh})` }}>
            <div className='log col-12 container'>
                <div className='signinform col-12'>
                    <div className='rightside  col-lg-6'>
                        <h1 className='descript'>Welcome </h1>
                        <h1 className='descript'>Back</h1>
                        <br /><br />
                    </div>
                    
                    <div className='leftside  col-lg-6 col-sm-12'>
                        <div className='frm col-12'>
                            <h1 className='logdes'>Login</h1>
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div class="group col-12">
                                    <input
                                        className='input11'
                                        placeholder='Enter your email'
                                        type='text'
                                        id='email'
                                        autoComplete='off'
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        required
                                    />
                                </div>
                                <br />
                                <div class="group">
                                    <input
                                        className='input11'
                                        placeholder='Enter your password'
                                        type='password'
                                        id='password'
                                        autoComplete='off'
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        required
                                    />
                                    <br />
                                </div>
                                <br />
                                <p>
                                    <Link className='link33' to=''>Forgot Password ?</Link>
                                </p>
                                <br />
                                <br />
                                <button className='btn5' type='submit'>
                                    Login
                                </button>
                                <br />
                                {errMsg && (
                                    <p style={{ textAlign: 'center', color: 'red' }}>{errMsg}</p>
                                )}
                                <br />
                                <hr />
                                <div className='signinlink'>
                                    <p className='p1' style={{ textAlign: 'center' }}>
                                        Don't have an account? <Link className='link2' to='/Signup/Signup'>Sign Up</Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

    