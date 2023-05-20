import express from "express";
import { authLogin } from "../middlewares/auth.middleware.js";
import { urlValid } from "../middlewares/urlValid.middleware.js";
import {
  getUrlById,
  postShorten,
  redirectUrl,
} from "../controllers/shorten.controller.js";

const router = express.Router();

router.post("/urls/shorten", authLogin, urlValid, postShorten);
router.get("/urls/:id", getUrlById);
router.get("/urls/open/:shortUrl", redirectUrl);

export default router;
