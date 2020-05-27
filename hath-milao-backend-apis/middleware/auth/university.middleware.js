const isUniversity = (req, res, next) => {
  const user = req.user;
  if (user.role == "university") return next();
  res.sendStatus(403);
};

export default isUniversity;
