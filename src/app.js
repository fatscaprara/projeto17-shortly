import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRouter from "./routers/auth.router.js";
import shortenRouter from "./routers/shorten.router.js";

const server = express();
server.use(express.json());
server.use(cors());
server.use(authRouter);
server.use(shortenRouter);

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running in PORT: ${port}`));
