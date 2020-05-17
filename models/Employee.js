/*const mongoose = require('mongoose');

const Employee = mongoose.model(
    "Employee",
    new mongoose.Schema({*/


const ObjectId = require("mongoose").ObjectId;
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
            type: ObjectId,
            ref: 'Position'
        },
        salary_per_hour: {
            type: Number,
            required: true
        }
    });
// );

module.exports = model('Employee', schema);