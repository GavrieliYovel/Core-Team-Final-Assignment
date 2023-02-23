const {Schema, model, mongoose} = require("mongoose");

const logsSchema = new Schema({
    level: {type: String, require: true},
    details: {type: String, require: true},
    date: {type: Date, default: new Date()}
}, {collection: 'logs', versionKey: false})

const Log = model('Log', logsSchema);

module.exports = {Log};
