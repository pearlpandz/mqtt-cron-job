const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = new Schema({
    tag: { type: String, required: true },
    pointName: { type: String, required: true },
    pointId: { type: Number, required: true },
    propertyName: { type: String, required: true },
    propertyValue: { type: Number, required: true },
    createdAt: { type: Date },
});

var RecordsSchema = mongoose.model('records', schema);

module.exports = RecordsSchema;