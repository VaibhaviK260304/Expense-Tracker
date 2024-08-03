import "./Home.css"
import React, { useEffect, useState } from 'react'
import toast, {Toaster} from 'react-hot-toast'
import axios from 'axios'

function Home() {

  const [user, setUser] = useState('')

  const [transactions, setTransactions] = useState('')

  useEffect(()=>{
    try {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      
      if(currentUser) {
        setUser(currentUser);
      } else {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
      window.location.href = '/login';
    }
  },[])

  const loadTransactions = async()=>{
    if(!user._id){
      return
    }
    toast.loading('Loading Transactions...')

    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/transactions?userId=${user._id}`)

    toast.dismiss()

    setTransactions(response.data.data)
  }

  useEffect(()=>{
    loadTransactions()
  },[user])
  
  return (
    <div>
      <h1 className="Home-greeting">Hello!! {user.name}</h1>
      <h2 className="Home-heading">Welcome to the Home Page</h2>

      <span className="home-logout" onClick={()=>{
        localStorage.clear()
        toast.success("Loged out successfully!!")

        setTimeout(()=>{
          window.location.href = '/login'
        }, 3000)

      }}>
        LOGOUT
      </span>
      <Toaster/>
    </div>
  )
}

export default Home