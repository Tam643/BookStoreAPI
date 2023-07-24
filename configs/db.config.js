const mongoose = require('mongoose');

const { DB_URI } = process.env;

exports.connect = () => {
    // Connecting to Databasse
    mongoose.connect(DB_URI)
    .then(()=>{
        console.log("Database is connected");
    })
    .catch((error) => {
        console.log("Error connecting to database")
        console.error(error);
        process.exit(1);
    });
}