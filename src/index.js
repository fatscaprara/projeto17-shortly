import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connection from "./database/database.js";
dotenv.config();

import authRouter from "./routes/authRouter.js";
import urlRouter from "./routes/urlRouter.js";
import userRouter from "./routes/userRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(urlRouter);
app.use(userRouter);

app.get("/", async (req, res) => {
  const result = await connection.query("SELECT * FROM users;");
  console.log("entrou2");

  res.send(result.rows);
});

const port = 4000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening in PORT: ${port}`);
});
