const express = require("express");
const bodyParser = require("body-parser");
import "dotenv/config";
import connectDb from "./config/db.config";
import morgan from "morgan";

const path = require("path");
const cors = require("cors");

// Routes
import UserRouter from "./routes/user.routes";
import StudentProfileRouter from "./routes/students/studentProfile.routes";
import CompanyProfileRouter from "./routes/companies/companyProfile.routes";
import CompanyJobRouter from "./routes/companies/companyJob.routes";
import UniversityProfileRouter from "./routes/universities/universityProfile.routes";
import StudentJobRouter from "./routes/students/studentJob.routes";
import UniversityJobRouter from "./routes/universities/universityJob.routes";
import StudentCompanyRouter from "./routes/students/studentCompany.routes";
import CompanyFYPRouter from "./routes/companies/companyFYP.routes";
import StudentFYPRouter from "./routes/students/studentFYP.routes";
import CompanyEventRouter from "./routes/companies/companyEvent.routes";
import StudentEventRouter from "./routes/students/studentEvent.routes";
import UniversityEventRouter from "./routes/universities/universityEvent.routes";
import CompanyStudentRouter from "./routes/companies/companyStudent.routes";
import CompanyChallengeRouter from "./routes/companies/companyChallenge.routes";
import StudentChallengeRouter from "./routes/students/studentChallenge.routes";
import StudentNotificationRouter from "./routes/students/studentNotification.routes";
import UniversityStatisticsRouter from "./routes/universities/reporting.routes";
import CompanyStatisticsRouter from "./routes/companies/reporting.routes";
import StudentStatisticsRouter from "./routes/students/reporting.routes";
import CompanyChatRouter from "./routes/companies/companyChat.routes";
import UniversityChatRouter from "./routes/universities/universityChat.routes";
import CompanyUniversityRouter from "./routes/companies/companyUniversity.routes";
import UniversityCompanyRouter from "./routes/universities/universityCompany";
import StudentUniversityRouter from "./routes/students/studentUniversity.routes";

// Application Configuations
const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));

const formData = require("express-form-data");
const os = require("os");
const options = {
  uploadDir: os.tmpdir(),
  autoClean: true
};
app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000
  })
);
process.env.NODE_ENV == "development"
  ? app.use(morgan("dev"))
  : app.use(morgan("combined"));

// Configuring Passport
require("./config/passport.config");

// Importing Routes

/* Registering Routes  */

app.use("/user", UserRouter);
/* Registering Student Routes  */

app.use("/student/profile", StudentProfileRouter);
app.use("/student/job", StudentJobRouter);
app.use("/student/company", StudentCompanyRouter);
app.use("/student/fyp", StudentFYPRouter);
app.use("/student/event", StudentEventRouter);
app.use("/student/challenge", StudentChallengeRouter);
app.use("/student/notification", StudentNotificationRouter);
app.use("/student/statistics", StudentStatisticsRouter);
app.use("/student/university", StudentUniversityRouter);

/* Registering Company Routes  */

app.use("/company/job", CompanyJobRouter);
app.use("/company/profile", CompanyProfileRouter);
app.use("/company/fyp", CompanyFYPRouter);
app.use("/company/event", CompanyEventRouter);
app.use("/company/student", CompanyStudentRouter);
app.use("/company/challenge", CompanyChallengeRouter);
app.use("/company/statistics", CompanyStatisticsRouter);
app.use("/company/chat", CompanyChatRouter);
app.use("/company/university", CompanyUniversityRouter);

/* Registering University Routes  */

app.use("/university/profile", UniversityProfileRouter);
app.use("/university/jobless", UniversityJobRouter);
app.use("/university/event", UniversityEventRouter);
app.use("/university/statistics", UniversityStatisticsRouter);
app.use("/university/chat", UniversityChatRouter);
app.use("/university/company", UniversityCompanyRouter);

/* Connecting to database and starting the server  */

connectDb()
  .then(async () => {
    app.listen(process.env.PORT, () => {
      console.log(
        `Api is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
      );
    });
  })
  .catch(err => {
    console.log("Couldn't connect to database!", err);
  });
