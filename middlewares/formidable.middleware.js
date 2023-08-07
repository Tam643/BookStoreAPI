const { formidable } = require('formidable');

function parsedData(data) {
  return Object.fromEntries(Object.entries(data).map(([key, value]) => [key, value[0].indexOf("[") === -1 ? value[0] : JSON.parse(value[0])]));
}
const isObjectEmpty = (objectName) => {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
};
module.exports = async function(req, res, next){
    const form = formidable({});

    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      if(!isObjectEmpty(fields)){
        req.body = parsedData(fields);
      }
      if(!isObjectEmpty(files)){
        req.body.image = files.image[0];
      }
      next();
    });
};