import jwt from "jsonwebtoken";
import connection from "../database/database.js";

export async function tokenValidate(req, res, next) {
  const { id } = req.params;
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const { rows: sessions } = await connection.query(
      `
    SELECT 
      *
    FROM
      sessions
    WHERE
      token = $1`,
      [token]
    );

    if (!sessions[0]) {
      return res.sendStatus(401);
    }

    const { rows: users } = await connection.query(
      `
    SELECT
      *
    FROM
      users
    WHERE
      id = $1 `,
      [sessions[0].user_id]
    );

    if (!users[0]) {
      return res.sendStatus(404);
    }

    const { rows: url } = await connection.query(
      `
    SELECT
      *
    FROM
      shortens
    WHERE
      id = $1`,
      [id]
    );

    if (sessions[0].user_id !== url[0].user_id) {
      return res.sendStatus(401);
    }

    req.urlId = url[0].id;
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
}
