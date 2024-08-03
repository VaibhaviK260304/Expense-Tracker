import Transaction from './../models/Transaction.js'

const postTransaction = async (req, res) => {
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

export {postTransaction}
