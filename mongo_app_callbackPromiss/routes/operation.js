const assert = require('assert');

exports.insertDocument = (dbname, document, collection, callback) => {
    const coll = dbname.collection(collection);
    return coll.insert(document)
};

exports.findDocuments = (dbname, collection, callback) => {
    const coll = dbname.collection(collection);
    return coll.find({}).toArray();
};

exports.removeDocument = (dbname, document, collection, callback) => {
    const coll = dbname.collection(collection);
    return coll.deleteOne(document)
};

exports.updateDocument = (dbname, document, update, collection, callback) => {
    const coll = dbname.collection(collection);
    return coll.updateOne(document, { $set: update }, null);
};
