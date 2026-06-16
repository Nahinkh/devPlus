import { Router } from "express";
import { issueController } from "./issues.controller";
import { auth } from "../../middleware/auth.middleware";

const router = Router();

router.post("/",auth, issueController.createIssues);
router.get("/",auth, issueController.getAllIssues);

export const issuesRoute = router;