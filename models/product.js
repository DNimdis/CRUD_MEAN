const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_product: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('Product', UserSchema);