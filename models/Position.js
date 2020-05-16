const { Schema, model } = require('mongoose');

const schema = new Schema({
    position_name: {
        type: String,
        required: true
    }
});

module.exports = model('Position', schema);