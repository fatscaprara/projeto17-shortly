import express from "express";
import { authLogin } from "../middlewares/auth.middleware.js";
import { urlValid } from "../middlewares/urlValid.middleware.js";
import {
  deleteUrl,
  getUrlById,
  postShorten,
  redirectUrl,
} from "../controllers/shorten.controller.js";

const router = express.Router();

router.post("/urls/shorten", authLogin, urlValid, postShorten);
router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", redirectUrl);
router.delete("/urls/:id", authLogin, deleteUrl);

export default router;
