var mongoose = require('mongoose'); 
Schema = mongoose.Schema;
var UserSchema = new Schema({
	month: String,
	weeks:[String],
	hours:Number,
	order:Number
});
mongoose.model('calendar', UserSchema);