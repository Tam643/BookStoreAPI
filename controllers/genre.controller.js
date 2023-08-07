const db = require('../models');
const { genreSchema } = require('../validators');
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

// find book
async function findById(req, res) {
    try {
        if (!db.mongoose.Types.ObjectId.isValid(req.params.id)) {
            onResponse({
                res,
                status: 400,
                error: true,
                message: 'The request data is invalid.'
            })
        }
        const result = await db.book.find({ genres: {$in : req.params.id }}).select('_id image description title author genres prices publisher').populate('genres', 'name').limit(25);
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

// Update Genre
async function update(req, res) {
    try {
        const { error, value } = genreSchema.validate(req.body);
        if (error) {
            onResponse({
                res,
                status: 400,
                message: 'The request data is invalid.',
                error: error
            });
        }
        if (!db.mongoose.Types.ObjectId.isValid(req.params.id)) {
            onResponse({
                res,
                status: 400,
                error: true,
                message: 'The request data is invalid.'
            })
        }
        const ObjectId = req.params.id;
        const updatedDocument = await db.genre.findByIdAndUpdate(ObjectId, value, { new: true });
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

module.exports = {
    findById,
    update,
}

