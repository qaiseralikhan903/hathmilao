const passport = require("passport");

import isStudent from "./student.middleware";
import isUniversity from "./university.middleware";
import isCompany from "./company.middleware";

const isLoggedIn = passport.authenticate("jwt", { session: false });

export { isUniversity, isStudent, isCompany, isLoggedIn };
