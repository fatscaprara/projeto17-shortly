import userSchema from "../schemas/user.schema.js";

export function userValid(req, res, next) {
  const user = req.body;
  const { error } = userSchema.validate(user);

  if (error) return res.sendStatus(422);

  const passwordAreSame = user.password === user.confirmPassword;

  if (!passwordAreSame) return res.sendStatus(422);

  req.user = user;
  next();
}
