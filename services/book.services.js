async function findAndCreateGenres(genres,db) {
    try {
        const genrePromises = genres.map(async (name) => {
            const genre = await db.genre.findOneAndUpdate(
                { name },
                { name },
                { upsert: true, new: true, select: '_id' }
            );
            return genre._id;
        });

        const genreIds = await Promise.all(genrePromises);
        return genreIds;
    } catch (err) {
        console.error('Error finding or creating genres:', err);
        throw err; // Rethrow the error to be handled by the caller
    }
}

module.exports = {
    findAndCreateGenres,
}