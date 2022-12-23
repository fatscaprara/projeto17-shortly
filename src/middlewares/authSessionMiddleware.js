import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import connection from "../database/database.js";
dotenv.config();

export async function authUser(req, res, next) {
  if (!req.headers.authorization) {
    return res.sendStatus(401);
  }

  const { url } = req.body;
  const urlRegex =
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

  const urlIsValid = urlRegex.test(url);

  if (!urlIsValid) {
    return res.sendStatus(422);
  }

  const token = req.headers?.authorization.replace("Bearer ", "");

  try {
    const decode = jwt.verify(token, process.env.SECRET_TOKEN);

    const { rows: findToken } = await connection.query(
      `
      SELECT
        *
      FROM
        sessions
      WHERE
        user_id = $1
      AND
        active = true
      ;
    `,
      [decode.user]
    );

    if (findToken.length) {
      req.dataUrl = { url, userId: findToken[0].user_id };
      return next();
    }

    res.sendStatus(401);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
