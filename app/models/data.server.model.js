var mongoose = require('mongoose'),
crypto = require('crypto'),
Schema = mongoose.Schema;
var UserSchema = new Schema({
	month: String,
	days: Number,
	order:Number
});
UserSchema.set('toJSON');
mongoose.model('data', UserSchema);