async function findAndCreateGenres(genres, db) {
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

async function findAndReturnData(datas, db) {
    try {
        const books = await db.book.find().select(["_id", "title", "prices"]);
        const items = [];
        let totalAmount = 0;

        datas.forEach(data => {
            const book = books.find(book => book._id == data.book);
            if (book) {
                const price = book.prices.find(price => price._id == data.price);
                if (price) {
                    totalAmount += (parseInt(price.price) * data.amount);
                    items.push({
                        _id: data.book,
                        amount:data.amount,
                        priceType: { type: price.type, price: parseInt(price.price) }
                    });
                }
            }
        });
        return { items, totalAmount };
    } catch (err) {
        console.error('Error find and return data:', err);
        throw err;
    }
}

module.exports = {
    findAndCreateGenres,
    findAndReturnData
}