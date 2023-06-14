import mongoose from "mongoose";

// export type Message = {
// 	id: string;
// 	message: string;
// };

const Schema = mongoose.Schema;

const messageSchema = new Schema({
	message: String,
	creator: Object
},
{ timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;