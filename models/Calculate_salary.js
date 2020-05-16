const { Schema, model } = require('mongoose');

const schema = new Schema({
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
    salary_with_tax:{
        type: Number,
        required: true
    }
});

module.exports = model('Calculate_salary', schema);