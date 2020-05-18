const mongoose = require('mongoose');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    work_time: {
        type: Number,
        required: true
    },
    max_work_time: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    premium: {
        type: Number,
        required: false
    },
    total_Income_Tax: {
        type: Number,
        required: true
    },
    salary_with_tax: {
        type: Number,
        required: true
    }
});

const Calculate_salary = mongoose.model('Calculate_salary', schema);
module.exports = Calculate_salary;