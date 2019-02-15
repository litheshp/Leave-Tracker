var mongoose = require('mongoose'), 
Schema = mongoose.Schema;
var UserSchema = new Schema({
	empIdlist:[String],
	WeekList: [{type: Date}],
	empList:[String],
	TeamList:[String],
	LocationList:[String],
	ProjectList:[String],
	teamData:[[String]]
});

UserSchema.set('toJSON');
mongoose.model('lookup', UserSchema);