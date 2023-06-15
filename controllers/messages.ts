import Message from "../models/message"
import User from "../models/user"

import { RequestHandler } from 'express'

import io from '../socket'

export const getMessages: RequestHandler =  (_req, res, _next) => {
	Message.find()
	.populate('creator')
	.then(messages => {
		const newMessages = messages.map((message: any) => {
			return { id: message._id.toString(), message: message.message, creator: message?.creator?.name }
		})
		res.status(200).json({ messages: newMessages })
	})
}

export const postMessage: RequestHandler = (req: any, res, _next) => {
	let creator;

	const newMessage = new Message({
		message: req.body.text,
		creator: req.userId
	})

	newMessage.save()
	.then(result => {
		return User.findById(req.userId);
	})
	.then(user => {
		creator = user
		user?.messages.push(newMessage._id)
		return user?.save();
	})
	.then(result => {
		io.getIO().emit('messages', { action: 'create', newMessage: { id: newMessage._id.toString() , message: newMessage.message, creator: creator.name } });
		res.status(201).json({ message: 'Added message', newMessage: newMessage, creator: creator.name });
	})
	.catch(error => {
		console.log(error);
	});
}