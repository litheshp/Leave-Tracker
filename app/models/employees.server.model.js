var mongoose = require('mongoose'), 
Schema = mongoose.Schema;
var UserSchema = new Schema({
	Emp_ID:String,
	Name:String,	
	Team:String,
	Project:String,
	Site: String,
	Status: String,
	Total_Available_Hrs:Number,
	Total_OT_Hrs:Number,	
	Total_Leave_Hours: Number,	
	Utilization:Number,
	Ute:String,
	Total_Productive_Hrs:Number,
	Total_DH:Number,
	Total_Chargeable_Hrs:Number
});

UserSchema.set('toJSON');
mongoose.model('employeeData', UserSchema);