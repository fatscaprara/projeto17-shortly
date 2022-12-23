import express from "express";
import { getUser } from "../controllers/userController.js";
import { tokenUserValidate } from "../middlewares/tokenUserValidateMiddleware.js";

const router = express.Router();

router.get("/users/me", tokenUserValidate, getUser);

export default router;
