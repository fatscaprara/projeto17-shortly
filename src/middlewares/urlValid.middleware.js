import urlSchema from "../schemas/url.schema.js";

export function urlValid(req, res, next) {
  const url = req.body;
  const { error } = urlSchema.validate(url);

  if (error) return res.sendStatus(422);

  req.url = url;
  next();
}
