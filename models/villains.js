var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var villainSchema = new Schema({
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

var Villains = mongoose.model('Villain', villainSchema);
module.exports = Villains;