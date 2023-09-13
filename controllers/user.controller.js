const { UserSchema } = require('../validators');
const { hashPassword } = require('../Utils').passwordUtils;
const db = require('../models');

// search user
async function search(req, res) {
    try {
        const { error, value: data } = UserSchema.search.validate(req.query);
        if (error) {
            return res.status(400).json({ success: false, message: error.message.replaceAll('\"', "") })
        }
        let result = null;
        if (Object.keys(data).length > 0) {
            if ("id" in data) {
                if (!db.mongoose.Types.ObjectId.isValid(data.id)) {
                    return res.status(404).json({ success: false, message: 'The bill with the specified ID was not found' })
                }
                result = await db.user.findById(data.id).select('_id email role address createAt');
            } else {
                Object.keys(data).forEach(key => {
                    switch (key) {
                        case "email":
                            data.email = { $regex: new RegExp(data.email, 'i') };
                            break;
                        case "address":
                            Object.keys(data.address).map(key => { key: { $regex: new RegExp(data.address[key], 'i') } })
                            break;
                    }
                })
                result = await db.user.find(data).select('_id email role createAt');
            }
        } else {
            result = await db.user.find().select('_id email role createAt');
        }
        if (typeof (result) === "undefined" || result === null || result.length === 0) {
            return res.status(404).json({ success: false, message: 'The requested resource was not found.' })
        }
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred on the server' })
    }
}

// get Detail from id
async function detail(req, res) {
    try {
        let result;
        if (Object.keys(req.query).length > 0 && req.user.role === "manager") {
            if (!db.mongoose.Types.ObjectId.isValid(req.query.id)) {
                return res.status(404).json({ success: false, message: 'The requested resource was not found.' })
            }
            result = await db.user.findById(req.query.id).select('_id email address role')
        } else {
            result = await db.user.findById(req.user.id).select('_id email address role')
        }
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred on the server' })
    }
}

// Update user
async function update(req, res) {
    try {
        const { error, value: data } = UserSchema.update.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: error.message.replaceAll('\"', "") })
        }
        let updatedDocument;
        if (data.password) {
            const { salt, hash } = await hashPassword(data.password);
            data.salt = salt;
            data.password_hashed = hash;
            delete data.password;
            delete data.confirmpassword;
        }
        if (data.id) {
            if (req.user.role !== "manager") {
                return res.status(403).json({ success: false, message: 'Insufficient permissions.' });
            }
            if (!db.mongoose.Types.ObjectId.isValid(data.id)) {
                return res.status(404).json({ success: false, message: 'The requested resource was not found.' })
            }
            const userid = data.id;
            delete data.id
            updatedDocument = await db.user.findByIdAndUpdate(userid, data, { new: true, timestamps: true });
        } else {
            updatedDocument = await db.user.findByIdAndUpdate(req.user.id, data, { new: true, timestamps: true });
        }
        return res.status(200).json({ success: true, message: 'The user was successfully updated' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred on the server' })
    }
}

// Delete user
async function onDelete(req, res) {
    try {
        if (!db.mongoose.Types.ObjectId.isValid(req.query.id)) {
            return res.status(404).json({ success: false, message: 'The bill with the specified ID was not found' })
        }
        const deletedDocument = await db.user.findByIdAndDelete(req.query.id);
        if (!deletedDocument) {
            return res.status(404).json({ success: false, message: 'The bill with the specified ID was not found' })
        }
        return res.status(204)
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred on the server' })
    }
}

module.exports = {
    detail,
    search,
    update,
    onDelete,
}