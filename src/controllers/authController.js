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
  const { userId, token } = req.user;
  try {
    await connection.query(
      `
      INSERT INTO
        sessions (user_id, token)
      VALUES
        ($1, $2)
      ;
    `,
      [userId, token]
    );

    //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjozLCJpYXQiOjE2NzE4MDM1OTJ9.wcjZUlkpKc_QX26M0d6eLZD7ayZ7l5JPUi0MwpYJC60
    res.send(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
