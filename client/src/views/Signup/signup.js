import React, { useState } from 'react'
import axios from 'axios'
import toast, {Toaster} from 'react-hot-toast'
import { Link } from 'react-router-dom'

function Signup() {
    const [user, setUser] = useState ({
        name: '',
        email: '',
        password: '', 
        dob: ''
    })

    const signup = async ()=>{
        const response =await axios.post(`${process.env.REACT_APP_BACKEND_URL}/signup`,
            {
                name: user.name,
                email: user.email,
                password: user.password,
                dob: user.dob
            }
        )
        if(response.data.success){
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)

            setUser({
                name: '',
                email: '',
                password: '',
                dob: ''
            })
        }

    }


  return (
    <div>
        <h1 className='signup-login-heading'>USER REGISTRATION</h1>
        <form className='signup-login-form'> 
            <input 
                type='text' 
                placeholder='Fullname' 
                className='user-input'
                value={user.name}
                onChange={(e) => setUser({...user, name: e.target.value})}          //(...user means existing user ki info vaise hi rehnedo bss name change hona chahiye)
            />
            <input 
                type='email' 
                placeholder='Email' 
                className='user-input'
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}          //(...user means existing user ki info vaise hi rehnedo bss email change hona chahiye)
            />
            <input 
                type='password' 
                placeholder='Password' 
                className='user-input'
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}          //(...user means existing user ki info vaise hi rehnedo bss password change hona chahiye
            />
            <input 
                type='date' 
                placeholder='DOB' 
                className='user-input'
                value={user.dob}
                onChange={(e) => setUser({...user, dob: e.target.value})}          //(...user means existing user ki info vaise hi rehnedo bss dob change hona chahiye
            />

            <button type='button' className='btn-auth' onClick={signup}>
                    REGISTER
            </button>
        </form>
        <Link to='/login' className='signup-login-link'> Already have an account? LOGIN</Link>
        <Toaster/>
    </div>
  )
}

export default Signup