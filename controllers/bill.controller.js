const db = require('../models');

async function create(req, res) {
    try {
        const user = await db.user.findById(req.user.id);
        if( Object.keys(user.address).length !== 0){
            return res.status(404).json({ success: true, message: 'Please update your address' })
        }
        return res.status(201).json({ success: true, message: 'Create new bill successfuly' })
    } catch (error) {
        return res.status(500).json({ success: false, error: 'An error occurred on the server' });
    }
}
async function findAllBillByuserID(req, res) {
    try {
        let result;
        if (!db.mongoose.Types.ObjectId.isValid(req.user.id)) {
            return res.status(400).json({ success: false, error: 'The request data is invalid.' })
        }
        if (req.query) {
            const status = ['pending', 'completed', 'canceled'];
            if (!req.query.status || !status.includes(req.query.status)) {
                return res.status(400).json({ success: false, error: 'The request data is invalid.' })
            }
            result = await db.bill.find({ user: req.user.id, status: req.query.status }).sort({ createAt: -1 }).limit(10);
        }
        result = await db.bill.find({ user: req.user.id }).sort({ createAt: -1 }).limit(10);
        return res.status(201).json({ success: true, data: result });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: 'An error occurred on the server' });
    }
}
async function update(req, res) {
    try {

        return res.status(201).json({ success: true, message: 'Update a bill successfuly' })
    } catch (error) {
        return res.status(500).json({ success: false, error: 'An error occurred on the server' });
    }
}
async function deleteBill(req, res) {
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