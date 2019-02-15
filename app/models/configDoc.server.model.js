var mongoose = require('mongoose'); 
Schema = mongoose.Schema;
var UserSchema = new Schema({
	title : String,
	value :[String],
	order:Number
});
mongoose.model('configdoc', UserSchema);