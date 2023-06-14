import { RequestHandler } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';

import User from '../models/user'

export const signup: RequestHandler = (req, res, next) => {
	const email = req.body.email;
	const name = req.body.name;
	const password = req.body.password;

	bcrypt.hash(password, 12)
	.then(hashedPass => {
		const user = new User({
			status: 'I am new',
			email: email,
			name: name,
			password: hashedPass
		});
		return user.save();
	})
	.then(result => {
		res.status(201).json({ message: 'User created', userId: result._id })
	})
	.catch(error => {
		if(!error.statusCode) {
			error.statusCode = 500;
		}
		next(error)
	})
};

export const login: RequestHandler = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	let loadedUser;
	User.findOne({ email: email })
		.then(user => {
			if(!user) {
				const error = new Error('This user could not be found.');
				throw error;
			}
			loadedUser = user
			return bcrypt.compare(password, user.password || '');
		})
		.then(isEqual => {
			if(!isEqual) {
				const error = new Error('Wrong password!');
				throw error;
			};
			const token = jwt.sign({
					email: loadedUser.email,
					userId: loadedUser._id.toString()
				}, 
				'secret',
				{ expiresIn: '1h' }
			);
			res.status(200).json({ token: token, userId: loadedUser._id.toString() })
		})
		.catch(error => {
			if(!error.statusCode) {
				error.statusCode = 500;
			}
			next(error)
		});
};
