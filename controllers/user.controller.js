const { updateUserSchema } = require('../validators');
const { findAndCreateGenres } = require('../services');
const { findKeyInObject } = require('../Utils');
const db = require('../models');

// find book
async function find(req, res) {
    try {
        if (!db.mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.sctatus(400).json({ success: false, error: 'The request data is invalid.' })
        }
        const result = await db.book.findById(req.params.id).select('_id image description title author genres prices publisher').populate('genres', 'name');
        if (!result) {
            return res.sctatus(404).json({ success: false, error: 'The requested resource was not found.' })
        }
        res.status(200).json({ success: true, result });
    } catch (error) {
        return res.status(500).json({ success: false, error: 'An error occurred on the server' })
    }
}

// Update Book
async function update(req, res) {
    try {
        if(req.body){
            const { error, value } = await updateUserSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ success: false, error: 'The request data is invalid.' })
            }
            console.dir(value);
        }
        return res.status(200).json({ success: true, message: 'The book was successfully updated' })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, error: 'An error occurred on the server' })
    }
}

// Delete Book
async function onDelete(req, res) {
    try {
        if (!db.mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ success: false, error: 'The book with the specified ID was not found' })
        }
        const deletedDocument = await db.book.findByIdAndDelete(req.params.id);
        if (!deletedDocument) {
            return res.status(404).json({ success: false, error: 'The book with the specified ID was not found' })
        }
        return res.status(204).json({ success: true, message: 'The book has been deleted' })
    } catch (error) {
        return res.status(500).json({ success: false, error: 'An error occurred on the server' })
    }
}

module.exports = {
    find,
    update,
    onDelete,
}