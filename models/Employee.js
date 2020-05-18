const mongoose = require('mongoose');

const schema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
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
    });

const Employee = mongoose.model('Employee', schema);
module.exports = Employee;