import connection from "../database/database.js";

export async function shortenUrlByIdValidate(req, res, next) {
  const { id } = req.params;

  try {
    const { rows: findShortenUrl } = await connection.query(
      `
      SELECT
        *
      FROM
        shortens
      WHERE
        id = $1
      ;
    `,
      [id]
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
