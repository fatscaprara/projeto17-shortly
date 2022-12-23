import { nanoid } from "nanoid";
import connection from "../database/database.js";

export async function postShorten(req, res) {
  const { url, userId } = req.dataUrl;

  const shortUrl = nanoid(8);

  try {
    await connection.query(
      `
      INSERT INTO
        shortens (url, user_id, short_url)
      VALUES
        ($1, $2, $3)
      ;
    `,
      [url, userId, shortUrl]
    );

    res.status(201).send({ shortUrl });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
