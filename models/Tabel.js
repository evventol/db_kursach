const { Schema, model } = require('mongoose');

const schema = new Schema({
    entry_time: {
        type: Date,
        required: true
    },
    exit_time: {
        type: Date,
        required: true
    },
    standart_working_month_hours: {
        type: Number,
        required: true
    }
});

module.exports = model('Tabel', schema);