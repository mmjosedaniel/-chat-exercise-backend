import { Router } from 'express';
import isAuth from '../middleware/is-auth';
import { body } from 'express-validator';

import { getMessages, postMessage } from '../controllers/messages';

const router = Router();

router.get('/', isAuth, getMessages);

router.post(
		'/message',
		[
			body('text').trim().isLength({min: 1})
		],
		isAuth,
		postMessage
	);

export default router;
