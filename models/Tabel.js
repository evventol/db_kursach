const mongoose = require('mongoose');

const Tabel = mongoose.model(
    "Tabel",
    new mongoose.Schema({
        employee:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee'
        },
        entry_time: {
            type: Date
        },
        exit_time: {
            type: Date
        },
        standart_working_month_hours: {
            type: Number
        }
    })
);

module.exports = Tabel;