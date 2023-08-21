const db = require('../models');



async function create(req, res){
    try {

        return res.status(201).json({ success: true, message: 'Create new bill successfuly' })
    } catch (error) {
        return res.status(500).json({ success: false, error: 'An error occurred on the server' });
    }
}
async function findAllBillByuserID(req, res){
    try {
        if (!db.mongoose.Types.ObjectId.isValid(req.user.id)) {
            return res.sctatus(400).json({ success: false, error: 'The request data is invalid.' })
        }
        return res.status(201).json({ success: true, message: 'Return All bill successfuly' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: 'An error occurred on the server' });
    }
}
async function update(req, res){
    try {

        return res.status(201).json({ success: true, message: 'Update a bill successfuly' })
    } catch (error) {
        return res.status(500).json({ success: false, error: 'An error occurred on the server' });
    }
}
async function deleteBill(req, res){
    try {

        return res.status(201).json({ success: true, message: 'Delete a bill successfuly' })
    } catch (error) {
        return res.status(500).json({ success: false, error: 'An error occurred on the server' });
    }
}


module.exports = {
    create,
    findAllBillByuserID,
    update,
    deleteBill
};