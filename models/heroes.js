var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var heroSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
}, {
        timestamps: true
    });

var Heroes = mongoose.model('Hero', heroSchema);
module.exports = Heroes;