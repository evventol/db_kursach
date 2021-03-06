const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    fio: {
        type: String,
        required: true
    },
    id_card: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    position: {
        type: String
    },
    salary_per_hour: {
        type: Number,
        required: true
    },
    birthDay: {
        type: Date,
        require: true
    }
});

const Employee = mongoose.model('Employee', schema);
module.exports = Employee;