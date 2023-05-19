import bcrypt from "bcrypt";
import { db } from "../config/database.js";
import userLoginSchema from "../schemas/userLogin.schema.js";

export async function userLoginValid(req, res, next) {
  try {
    const userLogin = req.body;
    const { error } = userLoginSchema.validate(userLogin);

    if (error) return res.sendStatus(422);
    const findUserByEmail = await db.query(
      `
      SELECT
        *
      FROM
        users
      WHERE
        email = $1
      ;
    `,
      [userLogin.email]
    );

    if (!findUserByEmail.rowCount) return res.sendStatus(401);

    const passwordIsCorrect = bcrypt.compareSync(
      userLogin.password,
      findUserByEmail.rows[0].password
    );

    if (!passwordIsCorrect) return res.sendStatus(401);

    req.userId = findUserByEmail.rows[0].id;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
