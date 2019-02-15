var mongoose = require('mongoose'), 
Schema = mongoose.Schema;
var UserSchema = new Schema({
	EMP_ID :String,
	Team :String,
	LOCATION_NAME :String,
	ACCOUNT_ID : String,
	EMPLOYEE_NAME : String,
	Status : String,
	Week1 : String,
	Week2 : String,
	Week3 : String,
	Week4 : String,
	Week5 : String,
	Week6 : String,
	Week7 : String,
	Week8 : String,
	Week9 : String,
	Week10 : String,
	Week11 : String,
	Week12 : String,
	Week13 : String,
	Week14 : String

});

UserSchema.set('toJSON');
mongoose.model('Importdata', UserSchema);