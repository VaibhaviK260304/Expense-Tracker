import axios from "axios";
import "./AddTransaction.css"
import { useState, useEffect } from 'react';
import toast, {Toaster} from "react-hot-toast";

function AddTransaction() {

  const [user, setUser] = useState("");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState('credit');
  const [category, setCategory] = useState('Learning');


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

  const addTransaction = async()=>{
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/transaction`,{
      user:user._id,
      title:title,
      amount:amount,
      type:type,
      category:category
    })
    toast.success(response.data.message)
    setTitle('')
    setAmount(0)
    setType('credit')
    setCategory('Learning')

    setTimeout(()=>{
      window.location.href = '/'
    },2000)
  }


  return (
    <div>
      <h1 className="signup-login-heading">Add Transaction for {user.name}</h1>

      <form className="signup-login-form">
        <input type="text"
               placeholder="Title"
               className="user-input"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
        />
        <input type="text"
               placeholder="amount"
               className="user-input"
               value={amount}
               onChange={(e)=>setAmount(e.target.value)}
        />

        <select className="user-input" value={type} onChange={(e)=>setType(e.target.value)}>
            <option value="credit">Income</option>
            <option value="debit">Expense</option>
        </select>
        <select className="user-input" value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="other">Category</option>
            <option value="food">Food</option>
            <option value="rent">Rent</option>
            <option value="gift">Gift</option>
            <option value="pocket money">Pocket Money</option>
            <option value="learning">Learning</option>
            <option value="salary">Salary</option>
            <option value="transport">Transport</option>
            <option value="entertainment">Entertainment</option>    
        </select>

        <button type="button" className="btn-auth" onClick={addTransaction}>
          Add transaction
        </button>
      </form>

      <Toaster/>
    </div>
  )
}

export default AddTransaction