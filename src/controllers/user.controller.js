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

    const visitCount = Number(findVisitCount.rows[0].sum);

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

export async function getRanking(req, res) {
  try {
    const ranking = await db.query(`
      SELECT
        u.id AS id,
        u.name AS name,
        COUNT(s.*) AS "linksCount",
        SUM (s."visitCount") AS "visitCount"
      FROM
        users AS u
      LEFT JOIN
        shortens AS s
      ON
        u.id = s."userId"
      GROUP BY
        u.id
      ORDER BY
        "visitCount"
      DESC
      LIMIT
        10
      ;
    `);

    const formatedRanking = ranking.rows.map(
      ({ id, name, linksCount, visitCount }) => {
        return {
          id,
          name,
          linksCount: Number(linksCount),
          visitCount: visitCount ? Number(visitCount) : 0,
        };
      }
    );

    res.send(formatedRanking);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
