require("dotenv").config();
module.exports={
    secretKey : process.env.JWT_SECRET,
    jwt : require('jsonwebtoken'),
}