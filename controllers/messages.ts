import { Message } from "../models/message"
import { RequestHandler } from 'express'

import io from '../socket'

const messages: Message[] = []

export const getMessages: RequestHandler =  (_req, res, _next) => {
	res.status(200).json({ messages: messages })
}

export const postMessage: RequestHandler = (req, res, _next) => {
	console.log(req.body);
	const newMessage: Message = { 
		id: new Date().toISOString(),
		message: req.body.text
	 };

	 messages.push(newMessage);
	 io.getIO().emit('messages', { action: 'create', newMessage: newMessage });
	 res.status(201).json({ message: 'Added message', newMessage: newMessage, messages: messages });
}