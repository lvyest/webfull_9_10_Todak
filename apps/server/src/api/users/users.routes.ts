import { Router } from 'express';

import { requireAuth } from '../../middleware/auth.middleware.js';

import { getMe } from './users.controller.js';

const router = Router();

router.get('/me', requireAuth, getMe);

export default router;
