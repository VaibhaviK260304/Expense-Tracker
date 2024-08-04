import "./TransactionCard.css"
import axios from "axios"
import toast, {Toaster} from "react-hot-toast"

function TransactionCard({_id, title, amount, category, type, createdAt, loadTransactions}) {
  
    const deletetransactions = async () => {
        if (!_id) {
          toast.error("Invalid transaction ID");
          return;
        }
        try {
          const response = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/transaction/${_id}`)
          toast.success(response.data.message)
          loadTransactions()
        } catch (error) {
          toast.error("Failed to delete transaction!")
        }
        setTimeout(() => {
          window.location.href = '/'
        }, 1000);
    }

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

        <button className="delete-transaction-btn" onClick={deletetransactions}>
            DELETE
        </button>
        <Toaster/>
    </div>
  )
}

export default TransactionCard