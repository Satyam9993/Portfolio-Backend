const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactMSGSchema = new Schema({
    email : {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    createdon : {
        type: Date,
        default: Date.now
    }
});
const ContactMSG = mongoose.model('ContactMSG', ContactMSGSchema);
module.exports = ContactMSG;