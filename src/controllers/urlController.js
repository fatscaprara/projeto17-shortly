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

export async function getUrlById(req, res) {
  const { dataShortUrl } = req;

  res.send(dataShortUrl);
}

export async function openShortUrl(req, res) {
  const { dataShortUrl } = req;

  try {
    const { rows: findVisits } = await connection.query(
      `
      SELECT
        *
      FROM
        visits
      WHERE
        short_id = $1
      ;
    `,
      [dataShortUrl.id]
    );

    if (findVisits.length) {
      await connection.query(
        `
        UPDATE
          visits
        SET
          visit = visit + 1
        WHERE
          short_id = $1
      `,
        [dataShortUrl.id]
      );
    } else {
      await connection.query(
        `
        INSERT INTO
          visits (short_id, visit)
        VALUES
          ($1, $2)
        ;
      `,
        [dataShortUrl.id, 1]
      );
    }

    res.redirect(dataShortUrl.url);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
