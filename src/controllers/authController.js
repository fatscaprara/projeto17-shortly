import connection from "../database/database.js";

export async function signup(req, res) {
  const { name, email, newPassword: password } = req.user;
  try {
    await connection.query(
      `
    INSERT INTO
      users (name, email, password)
    VALUES
      ($1, $2, $3)
    ;
    `,
      [name, email, password]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function signin(req, res) {
  console.log("rodando");
}
