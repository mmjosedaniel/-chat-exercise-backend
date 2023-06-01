import { Router } from 'express';

import { getMessages, postMessage } from '../controllers/messages';

const router = Router();

router.get('/', getMessages);

router.post('/message', postMessage);

export default router;
