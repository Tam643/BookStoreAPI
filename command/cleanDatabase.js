const { mongoose, book, bill, genre, user } = require("../models");
require('../configs/db.config')(mongoose)

async function removeAllDocuments(model) {
    try {
        await model.deleteMany({});
        console.log(`Removed all documents from ${model.collection.name} collection.`);
    } catch (error) {
        console.error(`Error removing documents from ${model.collection.name}: ${error}`);
    }
}

async function cleanDatabase() {
    try {
        await removeAllDocuments(bill);
        await removeAllDocuments(book);
        await removeAllDocuments(genre);
        await removeAllDocuments(user);
    } catch (error) {
        console.error('Error cleaning collections:', error);
    } finally {
        mongoose.connection.close();
        process.exit();
    }
}

cleanDatabase();
