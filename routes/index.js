module.exports = app => {
  app.use('/auth', require('./auth.routes'));
  app.use('/users', require('./user.routes'));
  app.use('/books', require('./book.routes'));
  app.use('/bills', require('./bills.routes.js'));
};