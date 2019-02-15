var mongoose = require('mongoose'), crypto = require('crypto'), 
Schema = mongoose.Schema;
var UserSchema = new Schema({
	HolidayName : String,
	Date	:	{ type: Date, default: Date.now },
	Location	:	String,
	Status :String
});
UserSchema.set('toJSON', {
	getters : true,
	virtuals : true
});
mongoose.model('Holiday', UserSchema);