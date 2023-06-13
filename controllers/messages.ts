import Message from "../models/message"
import { RequestHandler } from 'express'

import io from '../socket'

export const getMessages: RequestHandler =  (_req, res, _next) => {
	Message.find().then(messages => {
		const newMessages = messages.map(message => {
			return { id: message._id.toString(), message: message.message }
		})
		console.log(newMessages)
		res.status(200).json({ messages: newMessages })
	})
}

export const postMessage: RequestHandler = (req, res, _next) => {
	console.log(req.body);
	const newMessage = new Message({ message: req.body.text })
	newMessage.save()
	.then(result => {
		io.getIO().emit('messages', { action: 'create', newMessage: newMessage });
		res.status(201).json({ message: 'Added message', newMessage: newMessage });
	}).catch(error => {
		console.log(error);
	});
	// const newMessage: Message = { 
	// 	id: new Date().toISOString(),
	// 	message: req.body.text
	//  };

	//  messages.push(newMessage);

}