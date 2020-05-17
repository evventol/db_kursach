const mongoose = require('mongoose');

const Employee = mongoose.model(
    "Employee",
    new mongoose.Schema({
        fio: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        position: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Position'
        },
        salary_per_hour: {
            type: Number,
            required: true
        }
    })
);

module.exports = Employee;