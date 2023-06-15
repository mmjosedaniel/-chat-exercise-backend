import mongoose from "mongoose";

// export type Message = {
// 	id: string;
// 	message: string;
// };

const Schema = mongoose.Schema;

const messageSchema = new Schema({
	message: {
		type: String,
		required: true
	},
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
},
{ timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;