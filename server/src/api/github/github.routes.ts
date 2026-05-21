import { Router } from "express";
import { listRepos, getPR } from "./github.controller";
import { requireAuth } from "../../middleware/auth.middleware";

const router = Router();

router.use(requireAuth);

router.get("/repos", listRepos);
router.get("/repos/:owner/:repo/pulls/:pullNumber", getPR);

export default router;
