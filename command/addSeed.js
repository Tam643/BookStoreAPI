const { mongoose, book, bill, genre, user } = require("../models");
const fs = require('fs');
const path = require('path');

require('../configs/db.config')(mongoose)

const seedFiles = {
    user: path.join(__dirname, '/seed/users.json'),
    genre: path.join(__dirname, '/seed/genres.json'),
    book: path.join(__dirname, '/seed/books.json'),
    bill: path.join(__dirname, '/seed/bills.json'),
};

async function insertData(model, data) {
    try {
        await model.insertMany(data);
        console.log(`Inserted data into ${model.collection.name} collection.`);
    } catch (error) {
        console.error(`Error inserting data into ${model.collection.name}: ${error}`);
    }
}

function convertSaltToBuffer(data) {
    return data.map((item) => {
        if (item.salt && item.salt['$binary'] && item.salt['$binary'].base64) {
            const base64Salt = item.salt['$binary'].base64;
            item.salt = Buffer.from(base64Salt, 'base64');
        }
        return item;
    });
}

async function seedData() {
    try {
        for (const modelName in seedFiles) {
            if (seedFiles.hasOwnProperty(modelName)) {
                const jsonFile = seedFiles[modelName];
                let jsonData = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));
                let model;
                switch (modelName) {
                    case 'user':
                        model = user;
                        jsonData = convertSaltToBuffer(jsonData)
                        break;
                    case 'book':
                        model = book;
                        break;
                    case 'bill':
                        model = bill;
                        break;
                    case 'genre':
                        model = genre;
                        break;
                    default:
                        console.error(`Unknown model name: ${modelName}`);
                        continue;
                }

                console.log(`Inserting data for ${modelName}...`);
                await insertData(model, jsonData);
                console.log(`Data inserted successfully for ${modelName}.`);
            }
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        mongoose.connection.close();
        process.exit();
    }
}

seedData();
