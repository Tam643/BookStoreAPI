const express = require('express');
const router = express.Router();

router.get('/:id', function (req, res, next) {
  // validate param.id
  // finddata()
});
router.get('/new', function (req, res, next) {
  // finddata lastest
  // return data 25 objects
});
router.post('/', function (req, res, next) {
  // validate body
  // insert data in database
  // return status code and message
});
router.put('/', function (req, res, next) {
  // validate body
  // update data
  // return status code and message
});
router.delete('/:id', function (req, res, next) {
  // deletedata with id
  // return status code and message

});
router.delete('/', function (req, res, next) {
  // deleteall data base
  // return status code and message

});

module.exports = router;
