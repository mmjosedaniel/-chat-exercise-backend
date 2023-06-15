import mongoose, { SchemaType } from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type:String,
		required: true
	},
	name: {
		type:String,
		required: true
	},
	status: {
		type:String,
		required: true
	},
	messages: [{
		type: Schema.Types.ObjectId,
		ref: 'Message'
	}]
});

const User = mongoose.model('User', userSchema);


export default User;