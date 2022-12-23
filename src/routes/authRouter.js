import express from "express";
import { signin, signup } from "../controllers/authController.js";
import { signinValidate } from "../middlewares/signinValidateMiddleware.js";
import { userValidate } from "../middlewares/userValidateMiddleware.js";

const router = express.Router();

router.post("/signup", userValidate, signup);
router.post("/signin", signinValidate, signin);

export default router;
