import "./TransactionCard.css"

function TransactionCard({_id, title, amount, category, type, createdAt}) {
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
            color: type === 'credit' ? 'green' : 'red',
        }

        }>
            {type === "credit" ? "+" : "-"}
            {amount}
        </span>
    </div>
  )
}

export default TransactionCard