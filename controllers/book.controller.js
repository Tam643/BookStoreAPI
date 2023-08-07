const fs = require('fs-extra');
const { bookSchema, bookUpdateSchema } = require('../validators');
const { findAndCreateGenres } = require('../services');
const db = require('../models');

// Error handler if controller is not work
function onResponse({ res, status = 500, successfuly = false, message = 'An error occurred on the server', error = null }) {
    if (error || successfuly === false) {
        console.error(error);
        res.status(status).json({ success: successfuly, error: message });
    } else {
        res.status(status).json({ success: successfuly, message: message });
    }
    return;
}

// Helper Find name of key in object
function findKeyInObject(obj, keyToFind) {
    for (let key in obj) {
      if (key === keyToFind) {
        return true; // Key found
      }
    }
    return false; // Key not found
  }

// Create new Book
async function create(req, res) {
    try {
        /*
            Validate schema of request
            {
                image: any type, is required,
                title: string, is required,
                author: string, is required,
                description: string,
                isbn: string, is required,
                genres: array[items(string, is required)],
                publisher: string, is required,
                prices: array[
                        object({
                            type: string, is required,
                            price: string, is required
                        })
                    ]  
                )
            }
        */
        const { error, value } = await bookSchema.validate(req.body);
        if (error) {
            onResponse({
                res,
                status: 400,
                message: `The request data is invalid. ${error.message.trim()}`,
                error: error
            });
        }
        /*
            ensure file type is only image
            if image store image data in data object
            schema of image   
            image:{
                filename:{ type: String,required: true, trim: true },
                data:{ type: Buffer,required: true },
                type:{ type: String,required: true, trim: true }
            },
        */
        const { image } = value
        const imageType = image.mimetype.substr(0, 5).trim();
        if (imageType !== "image") {
            onResponse({
                res,
                status: 400,
                message: 'The request data is invalid. File should be image only',
                error: error
            });
        }
        value.image.filename = image.newFilename;
        // convert image file to binary data prepare to save in database
        value.image.data = await fs.readFile(image.filepath);
        value.image.type = image.mimetype;
        // Find genre if exist return objetId
        // else create new genre and return objectId 
        // example datatype [objectId("genre1"), objectId("genre2")]
        value.genres = await findAndCreateGenres(value.genres, db);
        await fs.unlink(image.filepath);
        await db.book.create(value);
        onResponse({
            res,
            status: 201,
            successfuly: true,
            message: 'Create new book successfuly',
        });
    } catch (error) {
        onResponse({ res });
    }
}

// find book
async function detail(req, res) {
    try {
        if (!db.mongoose.Types.ObjectId.isValid(req.params.id)) {
            onResponse({
                res,
                status: 400,
                error: true,
                message: 'The request data is invalid.'
            })
        }
        const result = await db.book.findById(req.params.id).select('_id image description title author genres prices publisher').populate('genres', 'name');
        if (!result) {
            onResponse({
                res,
                status: 404,
                message: 'The requested resource was not found.',
            });
        }
        res.status(200).json({ success: true, result });
    } catch (error) {
        onResponse({ res });
    }
}

// Update Book
async function update(req, res) {
    try {
        const { error, value } = bookUpdateSchema.validate(req.body);
        if (error) {
            onResponse({
                res,
                status: 400,
                message: 'The request data is invalid.',
                error: error
            });
        }
        if (!db.mongoose.Types.ObjectId.isValid(req.params.id) && !req.params.id) {
            onResponse({
                res,
                status: 400,
                error: true,
                message: 'The request data is invalid.'
            })
        }
        if(findKeyInObject(value, "genres")){
            value.genres = await findAndCreateGenres(value.genres, db);
        }
        const ObjectId = req.params.id;
        const updatedDocument = await db.book.findByIdAndUpdate(ObjectId, value, { new: true });
        if (!updatedDocument) {
            onResponse({
                res,
                status: 404,
                error: true,
                message: 'The requested resource was not found.'
            })
        }
        onResponse({
            res,
            status: 200,
            successfuly:true,
            message: 'The book was successfully updated'
        })
    } catch (error) {
        onResponse({ res });
    }
}

// Delete Book
async function deleteBook(req, res) {
    try {
        if (!db.mongoose.Types.ObjectId.isValid(req.params.id)) {
            onResponse({
                res,
                status: 404,
                error: true,
                message: 'The book with the specified ID was not found'
            })
        }
        const deletedDocument = await db.book.findByIdAndDelete(req.params.id);
        if (!deletedDocument) {
            onResponse({
                res,
                status: 404,
                error: true,
                message: 'The book with the specified ID was not found'
            })
        }
        onResponse({
            res,
            status: 204,
            successfuly: true,
            message: 'The book has been deleted'
        })
    } catch (error) {
        onResponse({ res });
    }
}

// Find All Book New Arrival
async function newarrival(req, res) {
    try {
        const result = await db.book.find().sort({ createdAt: -1 }).limit(25);
        if (result.length === 0) {
            onResponse({
                res,
                status: 404,
                message: 'The requested resource was not found.',
            });
        }
        res.status(200).json(result);
    } catch (error) {
        onResponse({ res });
    }
}

module.exports = {
    create,
    detail,
    update,
    deleteBook,
    newarrival,
}