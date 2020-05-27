//Imports
import User from "../../../models/user.model";
import Student from "../../../models/studentProfile.model";
import Event from "../../../models/event.model";

//Event Information Added start
const AddEvent = (req, res) => {
  const data = req.body;
  const event = new Event(data);

  User.findOne({ _id: data.userid })
    .then(doc => {
      event.save((err, informationAdded) => {
        if (err) {
          return res.status(500).json({
            error: err,
            informationAdded: false
          });
        } else if (informationAdded) {
          return res.status(200).json({
            error: null,
            informationAdded: true
          });
        }
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "Company ID not found",
        informationAdded: false
      });
    });
};
//Event Information Added End

//ALL Event Information View start
const ViewAllEvent = (req, res) => {
  const { userid } = req.params;
  const { pageNumber } = req.params;
  const options = {
    page: pageNumber,
    limit: 5,
    sort: { postingdate: -1 },

    collation: {
      locale: "en"
    }
  };
  Event.paginate({ userid: userid, status: "active" }, options)
    .then(event => {
      return res.status(200).json({
        error: null,
        events: event
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "User id not Found"
      });
    });
};
//ALL Event Information View End

//Event Information Update start
const UpdateEvent = (req, res) => {
  const data = req.body;

  const { eventid } = req.params;

  const UpdateEvent = {
    title: data.title,
    field: data.field,
    createdBy: data.createdBy,
    startTime: data.startTime,
    endTime: data.endTime,
    venue: data.venue,
    description: data.description,
    requiredSkill: data.requiredSkill,
    dateAt: data.dateAt,
    eventType: data.eventType
  };

  Event.findOneAndUpdate({ _id: eventid }, { $set: UpdateEvent }, { new: true })
    .then(newEvent => {
      if (newEvent) {
        return res.status(200).json({
          error: null,
          updatedEvent: newEvent
        });
      } else {
        return res.status(500).json({
          error: "Event Not Updated"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Event Id Not Exist"
      });
    });
};
//Event Information Update End

// Event Delete Start
const DeleteEvent = (req, res) => {
  const { eventid } = req.params;

  const updateEvent = {
    status: "inactive"
  };

  Event.findOneAndUpdate({ _id: eventid }, { $set: updateEvent }, { new: true })
    .then(newEvent => {
      if (newEvent) {
        return res.status(200).json({
          error: null
        });
      } else {
        return res.status(500).json({
          error: "Event Not Updated"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Event Id Not Exist"
      });
    });
};
// Event Delete End

// Event Applicant API Start
const EventApplicants = (req, res) => {
  const { pageNumber, eventid } = req.params;

  const options = {
    page: pageNumber,
    limit: 5,
    collation: {
      locale: "en"
    }
  };

  Event.find({ _id: eventid }, "eventparticipants")
    .then(EventApplicant => {
      if (EventApplicant) {
        let getEventApplicantArray = EventApplicant[0].eventparticipants;

        Student.paginate({ userid: { $in: getEventApplicantArray } }, options)
          .then(AllStudents => {
            if (AllStudents) {
              return res.status(200).json({
                error: null,
                students: AllStudents
              });
            } else {
              return res.status(500).json({
                error: "Students Not Exist"
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "Event ID  Not Exist"
            });
          });
      } else {
        return res.status(500).json({
          error: "Event Id Not Exist"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Event Id Not Exist"
      });
    });
};
// Event Applicant API End

//Search Event Information View start
const SearchEvent = (req, res) => {
  const { userid, pageNumber, title, date, type } = req.params;
  let filter_object = { userid: userid, status: "active" };
  if (date !== "null") {
    let pair = { postingdate: new Date(date) };
    filter_object = { ...filter_object, ...pair };
  }
  if (title !== "null") {
    let pair = { title: { $regex: ".*" + title + ".*", $options: "i" } };
    filter_object = { ...filter_object, ...pair };
  }
  if (type !== "null") {
    let pair = { eventType: type };
    filter_object = { ...filter_object, ...pair };
  }

  const options = {
    page: pageNumber,
    limit: 5,
    collation: {
      locale: "en"
    }
  };

  Event.paginate(filter_object, options)
    .then(event => {
      return res.status(200).json({
        error: null,
        events: event
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: "User id not Found",
        event: null
      });
    });
};
//Search Event Information View End

//Exports
export {
  DeleteEvent,
  EventApplicants,
  UpdateEvent,
  ViewAllEvent,
  AddEvent,
  SearchEvent
};
