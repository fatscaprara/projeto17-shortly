import express from "express";
import { userValid } from "../middlewares/userValid.middleware.js";
import { signUp } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", userValid, signUp);

export default router;
