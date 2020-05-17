const mongoose = require('mongoose');

const Position = mongoose.model(
    "Position",
    new mongoose.Schema({
        position_name: {
            type: String,
            required: true
        }
    })
);

module.exports = Position;