const db = require('../models');
const { findAndReturnData } = require('../services');
const { BillSchema } = require('../validators');

async function create(req, res) {
    try {
        const user = await db.user.findById(req.user.id);
        if (Object.keys(user.address).length === 0) {
            return res.status(404).json({ success: true, message: 'Please update your address' })
        }
        const { error, value } = BillSchema.create.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, error: error.message.replaceAll('\"', "") })
        }
        const data = await findAndReturnData(value.items, db);
        data.user = req.user.id;
        await db.bill.create(data);
        return res.status(201).json({ success: true, message: 'Create new bill successfuly' })
    } catch (error) {
        return res.status(500).json({ success: false, error: 'An error occurred on the server' });
    }
}
async function findAllBillByuserID(req, res) {
    try {
        let result;
        if (Object.keys(req.query).length > 0) {
            const status = ['pending', 'completed', 'canceled'];
            if (!req.query.status || !status.includes(req.query.status)) {
                return res.status(400).json({ success: false, error: 'The request data is invalid.' })
            }
            result = await db.bill.find({ user: req.user.id, status: req.query.status }).sort({ createAt: -1 }).limit(10);
        } else {
            result = await db.bill.find({ user: req.user.id }).sort({ createAt: -1 }).limit(10);
        }
        return (result.length > 0) ? res.status(201).json({ success: true, data: result }) : res.status(404).json({ success: false, error: "Not Found" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: 'An error occurred on the server' });
    }
}
async function update(req, res) {
    try {
        if (req.user.role === "customer") {
            const bill = await db.bill.findByIdAndUpdate(req.params.billId, { status: "canceled" }, { new: true });
            console.log(bill)
            return res.status(201).json({ success: true, message: 'Update a bill successfuly' })
        }
        const { error, value } = BillSchema.update.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, error: error.message.replaceAll('\"', "") })
        }
        const bill = await db.bill.findByIdAndUpdate(req.params.billId, value, { new: true });
        console.log(bill)
        return res.status(201).json({ success: true, message: 'Update a bill successfuly' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: 'An error occurred on the server' });
    }
}


module.exports = {
    create,
    findAllBillByuserID,
    update,
};