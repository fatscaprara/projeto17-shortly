import express from "express";
import { getRanking, getUser } from "../controllers/userController.js";
import { tokenUserValidate } from "../middlewares/tokenUserValidateMiddleware.js";

const router = express.Router();

router.get("/users/me", tokenUserValidate, getUser);
router.get("/ranking", getRanking);

export default router;
