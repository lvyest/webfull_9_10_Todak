import { Response } from 'express';

import { AuthenticatedRequest } from '../../types/index.js';

export async function getMe(req: AuthenticatedRequest, res: Response) {
  res.json({ success: true, data: req.user ?? null });
}
