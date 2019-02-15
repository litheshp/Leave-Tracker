var mongoose = require('mongoose'), 
Schema = mongoose.Schema;
var UserSchema = new Schema({
	Emp_ID:String,
	Week:{ type: Date },
	Project: String,
	Name : String,
	Team:String,
	Site:String,
	Emp_Status:String,
	Productive_Hrs:Number,
	Available_Hrs:Number,
	Chargeable_Hrs:Number,
	OT_Hours:Number,	
	Leave_Hrs: Number,
	DH:Number
});

UserSchema.set('toJSON');
mongoose.model('weeklydata', UserSchema);