const { updateUserSchema } = require('../validators');
const { findAndCreateGenres } = require('../services');
const { hashPassword } = require('../Utils').passwordUtils;
const { findKeyInObject } = require('../Utils');
const db = require('../models');

// find user
async function find(req, res) {
    try {
        if (!db.mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.sctatus(400).json({ success: false, error: 'The request data is invalid.' })
        }
        const result = await db.bill.findById(req.params.id).select('_id image description title author genres prices publisher').populate('genres', 'name');
        if (!result) {
            return res.sctatus(404).json({ success: false, error: 'The requested resource was not found.' })
        }
        res.status(200).json({ success: true, result });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'An error occurred on the server' })
    }
}

// Update user
async function update(req, res) {
    try {
        const { error, value: data } = updateUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, error: error.message.replaceAll('\"',"") })
        }
        if (data.password) {
            const { salt, hash } = await hashPassword(data.password);
            data.salt = salt;
            data.password_hashed = hash;
            delete data.password;
            delete data.confirmpassword;
        }
        const updatedDocument = await db.user.findByIdAndUpdate(req.user.id, data, { new: true });
        if (!updatedDocument) {
            return res.status(404).json({ success: false, error: 'The requested resource was not found.' })
        }
        return res.status(200).json({ success: true, message: 'The bill was successfully updated' })
    } catch (error) {
        return res.status(500).json({ success: false, error: 'An error occurred on the server' })
    }
}

// Delete user
async function onDelete(req, res) {
    try {
        if (!db.mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ success: false, error: 'The bill with the specified ID was not found' })
        }
        const deletedDocument = await db.bill.findByIdAndDelete(req.params.id);
        if (!deletedDocument) {
            return res.status(404).json({ success: false, error: 'The bill with the specified ID was not found' })
        }
        return res.status(204).json({ success: true, message: 'The bill has been deleted' })
    } catch (error) {
        return res.status(500).json({ success: false, error: 'An error occurred on the server' })
    }
}

module.exports = {
    find,
    update,
    onDelete,
}