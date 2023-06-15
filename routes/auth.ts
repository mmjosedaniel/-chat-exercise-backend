import { Router } from 'express';
import { body } from 'express-validator';

import User from '../models/user';

import { login, signup } from '../controllers/auth';



const router = Router();

router.put(
	'/signup',
	[
		body('email')
			.isEmail()
			.withMessage('Please enter a valid email.')
			.custom((value, { req }) => {
				return User.findOne({ email: value })
				.then(userDoc => {
					if (userDoc) {
						return Promise.reject('Email adress already exists!');
					};
				});
			})
			.normalizeEmail(),
		body('password').trim().isLength({ min: 4 }),
		body('name').trim().not().isEmpty()
	],
	signup
);

router.post('/login', login);

export default router;