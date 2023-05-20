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

export async function getUrlById(req, res) {
  try {
    const { id: urlId } = req.params;

    const shorten = await db.query(
      `
      SELECT
        *
      FROM
        shortens
      WHERE
        id = $1
      ;
    `,
      [urlId]
    );

    if (!shorten.rowCount) return res.sendStatus(404);

    const { id, shortUrl, url } = shorten.rows[0];

    res.status(200).send({ id, shortUrl, url });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function redirectUrl(req, res) {
  try {
    const { shortUrl } = req.params;

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

    if (!shorten.rowCount) return res.sendStatus(404);

    await db.query(
      `
      UPDATE
        shortens
      SET
        "visitCount" = "visitCount" + 1
      WHERE
        id = $1
      ;
    `,
      [shorten.rows[0].id]
    );

    res.redirect(shorten.rows[0].url);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function deleteUrl(req, res) {
  try {
    const { user } = req;
    const { id: shortId } = req.params;

    const shorten = await db.query(
      `
      SELECT
        *
      FROM
        shortens
      WHERE
        id = $1
      ;
    `,
      [shortId]
    );

    if (!shorten.rowCount) return res.sendStatus(404);

    if (shorten.rows[0].userId !== user.id) return res.sendStatus(401);

    await db.query(
      `
      DELETE FROM
        shortens
      WHERE
        id = $1
      ;
    `,
      [shortId]
    );

    res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
