var mongoose = require('mongoose'), 
Schema = mongoose.Schema;
var UserSchema = new Schema({
	FirstName	:	String,
	SecondName 	:	String,
	empId 	:	String,
	username	:	String,
	StartDate	:	{ type: Date, default: Date.now },
	EndDate	:	{ type: Date, default: Date.now },
	Reason	:	String,
	Type	:	String,
	team : String,
	Status: { type: String, default: "New" },
	days:Number	
});
UserSchema.virtual('fullName').get(function() {
	return this.FirstName + ' ' + this.SecondName;
	}).set(function(fullName) {
	var splitName = fullName.split(' ');
	this.FirstName = splitName[0] || '';
	this.SecondName = splitName[1] || '';
});
UserSchema.set('toJSON', {
	getters: true,
	virtuals: true
	});
mongoose.model('Request', UserSchema);