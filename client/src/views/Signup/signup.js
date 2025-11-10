import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast'; // Corrected import

// Use a relative path. Nginx will proxy this.
const API_BASE_URL = '/api'; 

const Signup = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        dob: ''
    });
    const navigate = useNavigate();

    const signup = async (e) => {
        // Prevent form from submitting in the traditional way
        e.preventDefault(); 
        
        try {
            const response = await axios.post(`${API_BASE_URL}/signup`, {
                name: user.name,
                email: user.email,
                password: user.password,
                dob: user.dob
            });

            if (response.data.success) {
                toast.success(response.data.message);
                // Navigate to login after successful signup
                navigate('/login'); 
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Signup error:', error);
            toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    return (
        <div>
            <h1 className='signup-login-heading'>USER REGISTRATION</h1>
            {/* Use onSubmit for the form */}
            <form className='signup-login-form' onSubmit={signup}>
                <input
                    type='text'
                    placeholder='Fullname'
                    className='user-input'
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    required
                />
                <input
                    type='email'
                    placeholder='Email'
                    className='user-input'
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    required
                />
                <input
                    type='password'
                    placeholder='Password'
                    className='user-input'
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    required
                />
                <input
                    type='date'
                    placeholder='DOB'
                    className='user-input'
                    value={user.dob}
                    onChange={(e) => setUser({ ...user, dob: e.target.value })}
                    required
                />
                {/* Change button type to 'submit' */}
                <button type='submit' className='btn-auth'>
                    REGISTER
                </button>
            </form>
            <Link to='/login' className='signup-login-link'> Already have an account? LOGIN</Link>
            <Toaster />
        </div>
    );
}

export default Signup;