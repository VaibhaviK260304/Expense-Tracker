import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

// --- FINAL FIX: Use a relative path. ---
// Nginx will proxy any request starting with /api to the backend.
const API_BASE_URL = '/api';
// --- END FINAL FIX ---

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const loginNow = async (e) => {
        e.preventDefault();
        try {
            // Use the relative API_BASE_URL
            const response = await axios.post(`${API_BASE_URL}/login`, {
                email,
                password,
            });
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem('currentUser', JSON.stringify(response.data.data));
                toast.success("Logged in successfully!");
                toast.loading("Redirecting to home..")
                setTimeout(() => {
                    toast.dismiss();
                    // Use navigate for modern React Router
                    navigate('/'); 
                }, 2000); 
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log('Login Error :', error);
            toast.error(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    return (
        <div>
            <h1 className='signup-login-heading'>USER LOGIN</h1>
            {/* Use onSubmit for the form */}
            <form className='signup-login-form' style={{ backgroundColor: '#8EC5FC' }} onSubmit={loginNow}>
                <input
                    type='email'
                    placeholder='Email'
                    className='user-input'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type='password' 
                    placeholder='Password'
                    className='user-input'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {/* Change button type to 'submit' */}
                <button type='submit' className='btn-auth'>Login</button> 
            </form>

            <Link to='/signup' className="signup-login-link"> Don't have an account? SIGNUP</Link>
            <Toaster />
        </div>
    );
}

export default Login;