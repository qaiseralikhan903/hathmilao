import Student from "../../../models/studentProfile.model";
import University from "../../../models/universityProfile.model";
import { Promise } from "mongoose";

const MyUniversity = (req, res) => {
  const { userid } = req.params;

  Student.findOne({ userid: userid })
    .then(async student => {
      let education = student.education;
      const universityContacts = student.universityContacts;
      const filter_university = education.filter(e => {
        return e.institution.search(/university/i) > 1;
      });
      const filter_name = [];
      filter_university.forEach(u => {
        filter_name.push({
          name: u.institution,
          city: u.campus
        });
      });

      let univeristies = [];
      await Promise.all(
        filter_name.map(async n => {
          const university = await University.find({
            name: {
              $regex: ".*" + n.name.substring(0, 4) + ".*",
              $options: "i"
            },
            city: {
              $regex: ".*" + n.city + ".*",
              $options: "i"
            }
          });
          if (university) {
            university.forEach(uni => univeristies.push(uni));
          }
        })
      );

      return res.status(200).json({
        univeristies: univeristies,
        universityContacts: universityContacts,
        error: null
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "Student Id Not Exist"
      });
    });
};

// Add To Contact University Start
const AddToContact = (req, res) => {
  const { universityid, studentid } = req.params;

  Student.findOneAndUpdate(
    { userid: studentid },
    { $push: { universityContacts: universityid } },
    { new: true }
  )
    .then(Updated => {
      if (Updated) {
        University.findOneAndUpdate(
          { userid: universityid },
          { $push: { studentContacts: studentid } },
          { new: true }
        )
          .then(Updated => {
            if (Updated) {
              return res.status(200).json({
                error: null
              });
            } else {
              return res.status(500).json({
                error: "University Id Not Exist"
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "University Id Not Exist"
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
// Add To Contact University End

//Exports
export { MyUniversity, AddToContact };
