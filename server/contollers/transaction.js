import Transaction from './../models/Transaction.js'
import User from "./../models/User.js";

const postTransaction = async (req, res)=>{
    const { title, amount, category, type, user } = req.body;
    const newTransaction = new Transaction({
        title,
        amount,
        category, 
        type, 
        user
    });
    try {
        const savedTransaction = await newTransaction.save();

        res.json({
            success: true,
            message: 'Transaction saved successfully',
            data: savedTransaction
        })
    }
    catch(e){
        res.json({
            success: false,
            message: e.message,
            data: null
        })
    }
}

const getTransactions = async(req, res)=>{
    const {userId} = req.query;

    const user = await User.findById(userId)
    if(!user){
        return res.json({
            success: false,
            message: 'User not found',
            data: null
        })
    }
    const transactions = await Transaction.find({user: userId}).sort({createdAt:-1});   //To put the recent transaction on the top of the list.
    res.json({
        success: true,
        message: 'Transactions retrieved successfully',
        data: transactions
    })
}

// const deleteTransaction = async (req, res) => {
//     try {
//         const id = req.params.id;
//         await Transaction.deleteOne({ _id: id });
//         res.json({ success: true, message: "Transaction deleted successfully", data : null });
//     }
//     catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// }

// export {postTransaction, getTransactions, deleteTransaction}
const deleteTransaction = async (req, res) => {
    try {
        const id = req.params.id;
        
        // 1. Check if the ID parameter exists
        if (!id) {
            return res.status(400).json({ success: false, message: "Transaction ID is required." });
        }

        // 2. Use findByIdAndDelete. This is the standard, clean method.
        // It relies on Mongoose to handle the ID casting. If the front-end is sending 
        // a bad ID, Mongoose should return an error that your catch block handles.
        const result = await Transaction.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ success: false, message: "Transaction not found or invalid ID format." });
        }

        res.json({ success: true, message: "Transaction deleted successfully", data: null });
    }
    catch (error) {
        // This catch block will handle the Mongoose CastError ("Invalid ID")
        // and any other database errors.
        console.error("Delete Error:", error.message);
        res.status(500).json({ success: false, message: "Failed to delete transaction: " + error.message });
    }
}

export {postTransaction, getTransactions, deleteTransaction}
