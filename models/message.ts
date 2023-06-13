import mongoose from "mongoose";

// export type Message = {
// 	id: string;
// 	message: string;
// };

const Schema = mongoose.Schema;

const messageSchema = new Schema({
	message: String
});

const Message = mongoose.model('Message', messageSchema);

export default Message;