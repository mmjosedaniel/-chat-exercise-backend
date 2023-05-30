import { Router } from 'express';

import { Message } from '../models/message';

const messages: Message[] = [{ id: "testId", message: 'This is my message' }]


const router = Router();

router.get('/', (req, res, next) => {
	res.status(200).json({ messages: messages })
});

router.post('/message', (req, res, next) => {
	console.log(req.body);
	const newMessage: Message = { 
		id: new Date().toISOString(),
		message: req.body.text
	 };

	 messages.push(newMessage);

	 res.status(201).json({ message: 'Added message', newMessage: newMessage, messages: messages });
});

export default router;