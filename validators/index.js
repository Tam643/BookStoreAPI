const Joi = require('joi');
module.exports = {
    loginFormSchema : require('./loginForm.validator'),
    updateUserSchema : require('./updateUser.validator'),
    registerSchema : require('./register.validator'),
    createBookSchema : require('./createBook.validator'),
    createBillSchema : require('./createBill.validator'),
    genreSchema : require('./genre.validator'),
    bookSchema : require('./book.validator'),
    searchBookSchema : require('./searchBook.validator'),
    BillSchema : require('./Bill.validator'),
}