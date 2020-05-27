const isStudent = (req, res, next) => {
  const user = req.user;
  if (user.role == "student") return next();
  res.sendStatus(403);
};

export default isStudent;
