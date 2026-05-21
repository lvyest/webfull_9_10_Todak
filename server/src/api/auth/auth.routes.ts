import { Router } from "express";
import { githubLogin, githubCallback, getMe } from "./auth.controller";
import { requireAuth } from "../../middleware/auth.middleware";

const router = Router();

router.get("/github", githubLogin);
router.get("/github/callback", githubCallback);
router.get("/me", requireAuth, getMe);

export default router;
