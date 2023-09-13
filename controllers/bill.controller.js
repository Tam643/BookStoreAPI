const db = require('../models');
const { BillSchema } = require('../validators');

async function create(req, res) {
    try {
        const User = await db.user.findById(req.user.id);
        if (Object.keys(User.address).length === 0) {
            return res.status(403).json({ success: false, message: 'Please update your address' })
        }
        const { error, value } = BillSchema.create.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.message.replaceAll('\"', "") })
        }
        const books = await db.book.find().select("_id");
        const arrayBooksID = books.map(book => book._id.toString());
        value.totalAmount = 0;
        const isFoundBooks = value.items.every(async data => {
            if (arrayBooksID.includes(data.book)) {
                value.totalAmount += (parseFloat(data.price.price) * data.amount);
                return true;
            } else {
                return false;
            }
        })
        if (!isFoundBooks) {
            return res.status(404).json({ success: true, message: 'The requested resource was not found.' })
        }
        value.user = req.user.id;
        await db.bill.create(value);
        return res.status(201).json({ success: true, message: 'Create new bill successfuly' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred on the server' });
    }
}
async function findAllBillByuserID(req, res) {
    try {
        let result;
        if (Object.keys(req.query).length > 0) {
            const status = ['pending', 'completed', 'canceled'];
            if (!req.query.status || !status.includes(req.query.status)) {
                return res.status(400).json({ success: false, message: 'The request data is invalid.' })
            }
            if (req.user.role === "customer") {
                result = await db.bill.find({ user: req.user.id, status: req.query.status })
                    .select("_id totalAmount status createdAt updatedAt")
                    .sort({ createAt: -1 })
                    .limit(25);
            } else {
                result = await db.bill.find({ status: req.query.status })
                    .select("_id totalAmount status createdAt updatedAt")
                    .sort({ createAt: -1 })
                    .limit(25);
            }
        } else {
            if (req.user.role === "customer") {
                result = await db.bill.find({ user: req.user.id })
                    .select("_id totalAmount status createdAt updatedAt")
                    .sort({ createAt: -1 })
                    .limit(25);
            } else {
                result = await db.bill.find()
                    .select("_id totalAmount status createdAt updatedAt")
                    .sort({ createAt: -1 })
                    .limit(25);
            }
        }
        return (result.length > 0) ? res.status(200).json({ success: true, data: result }) : res.status(404).json({ success: false, message: "Not Found" });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred on the server' });
    }
}
async function getDetailByID(req, res) {
    if (Object.keys(req.params).length === 0 || !db.mongoose.Types.ObjectId.isValid(req.params.billId)) {
        return res.status(400).json({ success: false, message: 'The request data is invalid.' })
    }
    try {
        const billId = req.params.billId;
        const result = await db.bill.findById(billId)
            .populate('user', 'address _id email role')
            .populate({
                path: "items",
                populate: {
                    path: "book",
                    select: '_id title'
                }
            })
        return res.status(200).json({ success: true, data: result })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred on the server' });

    }
}
async function update(req, res) {
    try {
        if (!db.mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ success: false, message: 'The requested resource was not found.' })
        }
        if (req.user.role === "customer") {
            await db.bill.findByIdAndUpdate(req.params.billId, { status: "canceled" }, { new: true, timestamps: true });
            return res.status(201).json({ success: true, message: 'Update a bill successfuly' })
        } else {

            const { error, value } = BillSchema.update.validate(req.body);
            if (error) {
                return res.status(400).json({ success: false, message: error.message.replaceAll('\"', "") })
            }
            await db.bill.findByIdAndUpdate(req.params.billId, value, { new: true, timestamps: true });
            return res.status(201).json({ success: true, message: 'Update a bill successfuly' })
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred on the server' });
    }
}

module.exports = {
    create,
    findAllBillByuserID,
    getDetailByID,
    update,
};