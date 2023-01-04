import connection from "../database/database.js";

export async function getUser(req, res) {
  const { user } = req;

  try {
    const { rows: findUser } = await connection.query(
      `
    SELECT
      users.id, users.name, SUM(visits.visit) AS "visitCount", 
      JSON_AGG(JSON_BUILD_OBJECT('id', shortens.id, 'shortUrl', shortens."short_url", 'url', shortens.url, 'visitCount', visits.visit)) AS "shortenedUrls" 
    FROM
      users 
    JOIN
      shortens
    ON
      shortens.user_id = users.id 
    JOIN
      visits
    ON
      shortens.id = visits.short_id
    WHERE
      users.id = $1
    GROUP BY
      users.id;`,
      [user.id]
    );

    res.send(findUser);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function getRanking(req, res) {
  try {
    const { rows: ranking } = await connection.query(`
    SELECT
      users.id, users.name, 
    COUNT(shortens.short_url) AS "linksCount",
    SUM(visits.visit) AS "visitCount" 
    FROM
      users 
    LEFT JOIN
      shortens
    ON
      shortens.user_id = users.id
    JOIN
      visits
    ON
      shortens.id = visits.short_id
    GROUP BY
      users.id 
    ORDER BY
      "visitCount" DESC
    LIMIT 10
    ;`);

    res.status(200).send(ranking);
  } catch (err) {
    console.log(err);
  }
}
