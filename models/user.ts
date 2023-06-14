import mongoose, { SchemaType } from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: String,
	password: String,
	name: String,
	status: String,
	messages: [{
		type: Schema.Types.ObjectId,
		ref: 'Message'
	}]
});

const User = mongoose.model('User', userSchema);


export default User;