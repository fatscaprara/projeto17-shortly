import express from "express";
import { authLogin } from "../middlewares/auth.middleware.js";
import { getUserInfo } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users/me", authLogin, getUserInfo);

export default router;
