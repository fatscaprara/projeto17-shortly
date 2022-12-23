import express from "express";
import { openShortUrl, postShorten } from "../controllers/urlController.js";
import { authUser } from "../middlewares/authSessionMiddleware.js";
import { shortenUrlValidate } from "../middlewares/shortenUrlValidateMiddleware.js";

const router = express.Router();

router.post("/urls/shorten", authUser, postShorten);
router.get("/urls/open/:shortUrl", shortenUrlValidate, openShortUrl);

export default router;
