const mongoose = require('mongoose');

const schema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        employee:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee'
        },
        entry_time: {
            type: Date
        },
        exit_time: {
            type: Date
        }
    });

const Tabel = mongoose.model('Tabel', schema);
module.exports = Tabel;