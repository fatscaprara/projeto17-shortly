import connection from "../database/database.js";
import bcrypt from "bcrypt";

export async function userValidate(req, res, next) {
  const { name, email, password, confirmPassword } = req.body;

  const isNotOK = !name || !email || !password || !confirmPassword;
  if (isNotOK) {
    return res.sendStatus(422);
  }

  const passwordHasDiff = password !== confirmPassword;
  if (passwordHasDiff) {
    return res.sendStatus(422);
  }

  try {
    const { rows: verifyExistEmail } = await connection.query(
      `
      SELECT
        *
      FROM
        users
      WHERE
        email = $1
    `,
      [email]
    );

    if (verifyExistEmail.length) return res.sendStatus(409);

    const newPassword = bcrypt.hashSync(password, 10);

    req.user = { name, email, newPassword };
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
