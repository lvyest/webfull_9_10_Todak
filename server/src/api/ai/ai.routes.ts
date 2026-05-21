import { Router } from "express";
import { requestCodeReview } from "./ai.controller";
import { requireAuth } from "../../middleware/auth.middleware";
import { validate } from "../../middleware/validate.middleware";
import { CodeReviewRequestSchema } from "./ai.schema";

const router = Router();

router.use(requireAuth);

router.post("/review", validate(CodeReviewRequestSchema), requestCodeReview);

export default router;
