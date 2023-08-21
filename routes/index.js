module.exports = app => {
  app.use('/genre', require('./genre.routes'));
  app.use('/book', require('./book.routes'));
  app.use('/auth', require('./auth.routes'));
  app.use('/bill', require('./bills.routes.js'));
};