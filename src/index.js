import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const port = 4000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening in PORT: ${port}`);
});
