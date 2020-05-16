const { Schema, model } = require('mongoose');

const schema = new Schema({
    fio: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    salary_per_hour: {
        type: Number,
        required: true
    }
});

module.exports = model('Employee', schema);