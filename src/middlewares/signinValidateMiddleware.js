import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connection from "../database/database.js";
import userSchema from "../schemas/userSchema.js";

export async function signinValidate(req, res, next) {
  const { email, password } = req.body;

  const { error } = userSchema.validate(
    { email, password },
    { abortEarly: false }
  );

  const existSomeError = error?.details.length > 0;
  if (existSomeError) {
    const errors = error.details.map((err) => err.message);
    return res.status(422).send(errors);
  }

  try {
    const { rows: findUser } = await connection.query(
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

    const passwordOk = bcrypt.compareSync(password, findUser[0].password);

    if (!findUser.length || !passwordOk) {
      return res.sendStatus(401);
    }

    const userId = findUser[0].id;
    const token = jwt.sign({ user: userId }, process.env.SECRET_TOKEN);

    req.user = { userId, token };
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
