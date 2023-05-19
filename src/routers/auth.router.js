import express from "express";
import { userValid } from "../middlewares/userValid.middleware.js";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { userLoginValid } from "../middlewares/userLoginValid.middleware.js";

const router = express.Router();

router.post("/signup", userValid, signUp);
router.post("/signin", userLoginValid, signIn);

export default router;
