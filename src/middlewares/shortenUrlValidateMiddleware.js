import connection from "../database/database.js";

export async function shortenUrlValidate(req, res, next) {
  const { shortUrl } = req.params;

  try {
    const { rows: findShortenUrl } = await connection.query(
      `
      SELECT
        *
      FROM
        shortens
      WHERE
        short_url = $1
      ;
    `,
      [shortUrl]
    );

    if (!findShortenUrl.length) {
      return res.sendStatus(404);
    }

    req.dataShortUrl = findShortenUrl[0];
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
