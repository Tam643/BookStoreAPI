const fs = require('fs-extra');
const { createBookSchema, bookSchema, searchBookSchema } = require('../validators');
const { findAndCreateGenres } = require('../services');
const { findKeyInObject } = require('../Utils');
const db = require('../models');


// Create new Book
async function create(req, res) {
    try {
        const { error, value } = await createBookSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, error: 'The request data is invalid.' })
        }
        const { image } = value
        const imageType = image.mimetype.substr(0, 5).trim();
        if (imageType !== "image") {
            return res.status(400).json({ success: false, error: 'The request data is invalid. File should be image only' })
        }
        value.image.filename = image.newFilename;
        value.image.data = await fs.readFile(image.filepath);
        value.image.type = image.mimetype;
        value.genres = await findAndCreateGenres(value.genres, db);
        await fs.unlink(image.filepath);
        await db.book.create(value);
        return res.status(201).json({ success: true, message: 'Create new book successfuly' })

    } catch (error) {
        return res.status(500).json({ success: false, error: 'An error occurred on the server' })
    }
}

// find book
async function detail(req, res) {
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
        const { error, value } = bookSchema.validate(req.body);
        if (error || !db.mongoose.Types.ObjectId.isValid(req.params.id) || !req.params.id) {
            return res.sctatus(400).json({ success: false, error: 'The request data is invalid.' })
        }
        if (findKeyInObject(value, "genres")) {
            value.genres = await findAndCreateGenres(value.genres, db);
        }
        const ObjectId = req.params.id;
        const updatedDocument = await db.book.findByIdAndUpdate(ObjectId, value, { new: true });
        if (!updatedDocument) {
            return res.status(404).json({ success: false, error: 'The requested resource was not found.' })
        }
        return res.status(200).json({ success: true, message: 'The book was successfully updated' })
    } catch (error) {
        return res.status(500).json({ success: false, error: 'An error occurred on the server' })
    }
}

// Delete Book
async function deleteBook(req, res) {
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

function isObjectNotEmpty(obj) {
    return Object.keys(obj).length > 0;
}

// Find All Book New Arrival
async function allBooks(req, res) {
    try {
        if (isObjectNotEmpty(req.query)) {
            const { error, value } = searchBookSchema.validate(req.query);
            if (error) {
                return res.status(400).json({ success: false, error: 'The request data is invalid.' })
            }
            for (let key in value) {
                if (key !== "isbn") {
                    value[key] = new RegExp(value[key], 'i');
                }
                if (key === "genres") {
                    const genre = await db.genre.findOne({ name: value[key] })
                    value[key] = { $in: genre._id };
                }
            }
            const result = await db.book.find(value).sort({ createdAt: -1 }).limit(25);
            return res.status(200).json(result);
        } else {
            const result = await db.book.find().sort({ createdAt: -1 }).limit(25);
            if (result.length === 0) {
                return res.status(404).json({ success: false, error: 'The requested resource was not found.' })
            }
            return res.status(200).json(result);
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: 'An error occurred on the server' })
    }
}

module.exports = {
    create,
    detail,
    update,
    deleteBook,
    allBooks,
}