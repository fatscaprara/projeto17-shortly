import { db } from "../config/database.js";

export async function authLogin(req, res, next) {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);

    const session = await db.query(
      `
      SELECT
        *
      FROM
        sessions
      WHERE
        token = $1
      ;
    `,
      [token]
    );

    if (!session.rowCount) return res.sendStatus(401);

    const findUser = await db.query(
      `
      SELECT
        *
      FROM
        users
      WHERE
        id = $1
    `,
      [session.rows[0].userId]
    );

    const user = findUser.rows[0];

    delete user.password;

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
