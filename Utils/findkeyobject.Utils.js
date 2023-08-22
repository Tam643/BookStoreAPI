// Helper Find name of key in object
module.exports =  function(obj, keyToFind) {
    for (let key in obj) {
        if (key === keyToFind) {
            return true; // Key found
        }
    }
    return false; // Key not found
}
