import express from "express";
import {
  deleteUrl,
  getUrlById,
  openShortUrl,
  postShorten,
} from "../controllers/urlController.js";
import { authUser } from "../middlewares/authSessionMiddleware.js";
import { shortenUrlByIdValidate } from "../middlewares/shortenUrlByIdValidate.js";
import { shortenUrlValidate } from "../middlewares/shortenUrlValidateMiddleware.js";
import { tokenValidate } from "../middlewares/tokenValidateMiddleware.js";

const router = express.Router();

router.post("/urls/shorten", authUser, postShorten);
router.get("/urls/:id", shortenUrlByIdValidate, getUrlById);
router.get("/urls/open/:shortUrl", shortenUrlValidate, openShortUrl);
router.delete("/urls/:id", tokenValidate, deleteUrl);

export default router;
