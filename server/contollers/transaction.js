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

const deleteTransaction = async (req, res) => {
    try {
        const id = req.params.id;
        await Transaction.deleteOne({ _id: id });
        res.json({ success: true, message: "Transaction deleted successfully", data : null });
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export {postTransaction, getTransactions, deleteTransaction}
