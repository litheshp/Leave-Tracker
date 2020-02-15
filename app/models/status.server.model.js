const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const statusSchema = new Schema({
    Portfolio: String,
    CurrentStatus: String,
    Number:Number 
});
statusSchema.set('toJSON', {
    getters: true,
    virtuals: true
    });
mongoose.model('status', statusSchema);