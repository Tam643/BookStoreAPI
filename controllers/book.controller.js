const fs = require('fs-extra');
const { BookSchema } = require('../validators');
const { findAndCreateGenres } = require('../services');
const db = require('../models');


// Create new Book
async function create(req, res) {
    try {
        const { error, value } = BookSchema.create.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: 'The request data is invalid.' })
        }
        const { image } = value
        const imageType = image.mimetype.substr(0, 5).trim();
        if (imageType !== "image") {
            return res.status(400).json({ success: false, message: 'The request data is invalid. File should be image only' })
        }
        value.image.filename = image.newFilename;
        value.image.data = await fs.readFile(image.filepath);
        value.image.type = image.mimetype;
        value.genres = await findAndCreateGenres(value.genres, db);
        await fs.unlink(image.filepath);
        await db.book.create(value);
        return res.status(201).json({ success: true, message: 'Create new book successfuly' })

    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred on the server' })
    }
}

// find book
async function findbyID(req, res) {
    try {
        if (!db.mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ success: false, message: 'The requested resource was not found.' })
        }
        const result = await db.book.findById(req.params.id).select('_id image description title author genres prices publisher').populate('genres', 'name');
        if (!result) {
            return res.status(404).json({ success: false, message: 'The requested resource was not found.' })
        }
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred on the server' })
    }
}

// Update Book
async function update(req, res) {
    try {
        if (!db.mongoose.Types.ObjectId.isValid(req.params.id) || !req.params.id) return res.status(404).json({ success: false, message: 'The requested resource was not found.' })
        const { error, value } = BookSchema.update.validate(req.body);
        if (error) {
            return res.status(400).json({ success: false, message: 'The request data is invalid.' })
        }
        if ("genres" in value) {
            value.genres = await findAndCreateGenres(value.genres, db);
        }
        const ObjectId = req.params.id;
        const updatedDocument = await db.book.findByIdAndUpdate(ObjectId, value, { new: true, timestamps: true });
        if (!updatedDocument) {
            return res.status(404).json({ success: false, message: 'The requested resource was not found.' })
        }
        return res.status(200).json({ success: true, message: 'The book was successfully updated' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred on the server' })
    }
}

// Delete Book
async function deleteBook(req, res) {
    try {
        if (!db.mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(404).json({ success: false, message: 'The book with the specified ID was not found' })
        }
        await db.book.findByIdAndDelete(req.params.id);
        return res.status(204).json({ success: true, message: 'The book has been deleted' })
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred on the server' })
    }
}

// Find All Book New Arrival
async function searchAllBooks(req, res) {
    try {
        if (Object.keys(req.query).length > 0) {
            const { error, value: datas } = BookSchema.search.validate(req.query);
            if (error) {
                return res.status(400).json({ success: false, message: 'The request data is invalid.' })
            }
            for (let key in datas) {
                if (key !== "isbn") {
                    if (key == "genres") {
                        datas[key] = { $elemMatch: { name: { $regex: new RegExp(datas[key], 'i') } } }
                    } else {
                        datas[key] = { $regex: new RegExp(datas[key], 'i') };
                    }
                }
            }
            if (await db.book.countDocuments().length === 0) return res.status(404).json({ success: false, message: 'The requested resource was not found.' })
            const result = await db.book.aggregate([
                {
                    $lookup: {
                        from: "genres",
                        localField: "genres",
                        foreignField: "_id",
                        as: "genres",
                    },
                },
                {
                    $match: datas,
                },
                {
                    $addFields: {
                        genres: "$genres.name"
                    }
                },
                {
                    $project: {
                        _id: 1, 
                        title: 1, 
                        author: 1, 
                        image: 1,
                        genres: 1,
                        prices: 1,
                        description: 1,
                        publisher: 1
                    },
                },
                { $sort: { createdAt: 1 } },
                { $limit: 25 },
            ]);
            if (result.length === 0) {
                return res.status(404).json({ success: false, message: 'The requested resource was not found.' })
            }
            return res.status(200).json({ success: true, data: result });
        } else {
            const result = await db.book.aggregate([
                {
                    $lookup: {
                        from: "genres",
                        localField: "genres",
                        foreignField: "_id",
                        as: "genres",
                    },
                },
                {
                    $addFields: {
                        genres: "$genres.name"
                    }
                },
                {
                    $project: {
                        _id: 1, 
                        title: 1, 
                        author: 1, 
                        image: 1,
                        genres: 1,
                        prices: 1,
                        description: 1,
                        publisher: 1
                    },
                },
                { $sort: { createdAt: 1 } },
                { $limit: 25 },
            ]);
            if (result.length === 0) {
                return res.status(404).json({ success: false, message: 'The requested resource was not found.' })
            }
            return res.status(200).json({ success: false, data: result });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'An error occurred on the server' })
    }
}

module.exports = {
    create,
    findbyID,
    update,
    deleteBook,
    searchAllBooks,
}