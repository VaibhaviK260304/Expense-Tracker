import "./TransactionCard.css"
import axios from "axios"
import toast, {Toaster} from "react-hot-toast"

function TransactionCard({_id, title, amount, category, type, createdAt, loadTransactions}) {
  
    const deleteTransaction = async()=>{
    try {
        const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/transactions/${_id}`)   
        toast.success(response.data.message)
        loadTransactions()
    }
    catch (error) {
        toast.error(error.message);
        console.error("There was an error!", error);
      }
    };
  
    return (
    <div className="transaction-card">
        <h1 className="transaction-card-title">
            {title}
        </h1>


        <span className="transaction-card-date"> 
            {new Date(createdAt).toLocaleString()}
        </span>

        <span className="transaction-card-category">
            {category}
        </span>


        <span className="transaction-card-amount" style={{
            color: type === 'credit' ? 'green' : 'red'
        }}>
            {type === "credit" ? "+" : "-"}
            {amount}
        </span>

        <button className="delete-transaction-btn" onClick={deleteTransaction}>
            DELETE
        </button>
        <Toaster/>
    </div>
  )
}

export default TransactionCard