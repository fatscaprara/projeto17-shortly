import { nanoid } from "nanoid";
import { db } from "../config/database.js";

export async function postShorten(req, res) {
  try {
    const { url } = req.url;
    const { id: userId } = req.user;
    const shortUrl = nanoid(8);

    await db.query(
      `
      INSERT INTO
        shortens (url, "shortUrl", "userId")
      VALUES
        ($1, $2, $3)
      ;
    `,
      [url, shortUrl, userId]
    );

    const shorten = await db.query(
      `
      SELECT
        *
      FROM
        shortens
      WHERE
        "shortUrl" = $1
      ;
    `,
      [shortUrl]
    );

    res
      .status(201)
      .send({ id: shorten.rows[0].id, shortUrl: shorten.rows[0].shortUrl });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
