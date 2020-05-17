const mongoose = require('mongoose');

const Calculate_salary = mongoose.model(
    "Calculate_salary",
    new mongoose.Schema({
        employee:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee'
        },
        work_time: {
            type: Date,
            required: true
        },
        max_work_time: {
            type: Date,
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
        Total_Income_Tax: {
            type: Number,
            required: true
        },
        salary_with_tax: {
            type: Number,
            required: true
        }
    })
);

module.exports = Calculate_salary;