import express from "express";
import { postShorten } from "../controllers/urlController.js";
import { authUser } from "../middlewares/authUserMiddleware.js";

const router = express.Router();

router.post("/urls/shorten", authUser, postShorten);

export default router;
