import Student from "../../../models/studentProfile.model";
import Company from "../../../models/companyProfile.model";
import University from "../../../models/universityProfile.model";

// Add to Contact Student API Start
const AddToContactStudent = (req, res) => {
  const { universityid, studentid } = req.params;

  University.findOneAndUpdate(
    { userid: universityid },
    { $push: { studentContacts: studentid } },
    { new: true }
  )
    .then(Updated => {
      if (Updated) {
        Student.findOneAndUpdate(
          { userid: studentid },
          { $push: { universityContacts: universityid } },
          { new: true }
        )
          .then(Updated => {
            if (Updated) {
              return res.status(200).json({
                error: null
              });
            } else {
              return res.status(500).json({
                error: "Student Id Not Exist"
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "Student Id Not Exist"
            });
          });
      } else {
        return res.status(500).json({
          error: "Student Id Not Exist"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Student Id Not Exist"
      });
    });
};
// Add to Contact Student API End

// Add to Contact Company API Start
const AddToContactCompany = (req, res) => {
  const { universityid, companyid } = req.params;

  University.findOneAndUpdate(
    { userid: universityid },
    { $push: { companyContacts: companyid } },
    { new: true }
  )
    .then(Updated => {
      if (Updated) {
        Company.findOneAndUpdate(
          { userid: companyid },
          { $push: { universityContacts: universityid } },
          { new: true }
        )
          .then(Updated => {
            if (Updated) {
              return res.status(200).json({
                error: null
              });
            } else {
              return res.status(500).json({
                error: "Student Id Not Exist"
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "Student Id Not Exist"
            });
          });
      } else {
        return res.status(500).json({
          error: "Student Id Not Exist"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Student Id Not Exist"
      });
    });
};
// Add to Contact Company API End

//Exports
export { AddToContactStudent, AddToContactCompany };
