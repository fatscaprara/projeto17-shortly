import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

const port = 4000 || process.env.PORT;
app.listen(port, () => {
  console.log(`Server listening in PORT: ${port}`);
});
