import { Router } from "express";
import { issueController } from "./issues.controller";
import { auth } from "../../middleware/auth.middleware";

const router = Router();

router.post("/",auth, issueController.createIssues);
router.get("/",auth, issueController.getAllIssues);
router.get("/:id",auth, issueController.getIssueById);
router.patch("/:id",auth, issueController.updateIssue);
router.delete("/:id",auth, issueController.deleteIssue);
export const issuesRoute = router;