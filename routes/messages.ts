import { Router } from 'express';
import isAuth from '../middleware/is-auth';

import { getMessages, postMessage } from '../controllers/messages';

const router = Router();

router.get('/', isAuth, getMessages);

router.post('/message', isAuth, postMessage);

export default router;
