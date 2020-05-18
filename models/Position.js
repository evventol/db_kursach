const mongoose = require('mongoose');

const schema = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        position_name: {
            type: String,
            required: true
        }
    });

const Position = mongoose.model('Position', schema);
module.exports = Position;

