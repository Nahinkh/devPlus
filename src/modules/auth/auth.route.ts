import { Router } from "express";
import { userController } from "./auth.controller";

const router = Router();

router.post("/signup",userController.createUser)
router.post("/login",userController.loginUser)

export const userRoute = router;