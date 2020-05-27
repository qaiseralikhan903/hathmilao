const isCompany = (req, res, next) => {
  const user = req.user;
  if (user.role == "company") return next();
  res.sendStatus(403);
};

export default isCompany;
