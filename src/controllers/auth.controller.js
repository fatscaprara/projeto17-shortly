import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { db } from "../config/database.js";

export async function signUp(req, res) {
  try {
    const { name, email, password } = req.user;
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
      [email]
    );

    if (findUserByEmail.rowCount) return res.sendStatus(409);

    const hashPassword = bcrypt.hashSync(password, 10);

    await db.query(
      `
      INSERT INTO
        users (name, email, password)
      VALUES
        ($1, $2, $3)
      ;
    `,
      [name, email, hashPassword]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function signIn(req, res) {
  try {
    const { userId } = req;
    const token = uuid();

    await db.query(
      `
      INSERT INTO
        sessions ("userId", token)
      VALUES
        ($1, $2)
      ;
    `,
      [userId, token]
    );

    res.status(200).send({ token });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
