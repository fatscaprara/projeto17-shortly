import { db } from "../config/database.js";

export async function getUserInfo(req, res) {
  try {
    const { user } = req;

    const findVisitCount = await db.query(
      `
      SELECT
        SUM ("visitCount")
      FROM
        shortens
      WHERE
        "userId" = $1
      ;
    `,
      [user.id]
    );

    const visitCount = findVisitCount.rows[0].sum;

    const findShortenedUrls = await db.query(
      `
      SELECT
        *
      FROM
        shortens
      WHERE
        "userId" = $1
      ;
    `,
      [user.id]
    );

    const shortenedUrls = findShortenedUrls.rows.map(
      ({ id, shortUrl, url, visitCount }) => {
        return { id, shortUrl, url, visitCount };
      }
    );

    const result = {
      id: user.id,
      name: user.name,
      visitCount,
      shortenedUrls,
    };

    res.send(result);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
