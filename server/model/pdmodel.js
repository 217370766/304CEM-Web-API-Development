const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pdschema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
    },
    price: Number,
    description: String
});

module.exports = mongoose.model('Product', pdschema);