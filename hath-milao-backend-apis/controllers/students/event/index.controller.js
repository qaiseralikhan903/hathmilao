//Imports
import Event from "../../../models/event.model";
import Student from "../../../models/studentProfile.model";

//View All Event start
const ViewAllEvent = (req, res) => {
  const { pageNumber, userid } = req.params;
  const options = {
    page: pageNumber,
    limit: 10,
    sort: { postingdate: -1 },
    collation: {
      locale: "en"
    }
  };
  Event.paginate({ status: "active" }, options)
    .then(events => {
      if (events) {
        Student.find({ userid: userid }, "registeredevents")
          .then(studentDoc => {
            if (studentDoc) {
              return res.status(200).json({
                error: null,
                events: events,
                studentDoc: studentDoc
              });
            } else {
              return res.status(500).json({
                error: "User Id Not Exist"
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "User Id Not Exist"
            });
          });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "Event Not Found"
      });
    });
};
//View All Event End

// Register Event API Start
const RegisterEvent = (req, res) => {
  const data = req.body;

  const { userid, eventid } = data;

  Student.findOneAndUpdate(
    { userid: userid },
    { $push: { registeredevents: eventid } },
    { new: true }
  )
    .then(UpdatedAppliedEvent => {
      if (UpdatedAppliedEvent) {
        Event.findOneAndUpdate(
          { _id: eventid },
          { $push: { eventparticipants: userid } },
          { new: true }
        )
          .then(UpdatedCompanyEventParticipants => {
            if (UpdatedCompanyEventParticipants) {
              return res.status(200).json({
                error: null,
                UpdatedAppliedEvent: UpdatedAppliedEvent,
                UpdatedCompanyEventParticipants: UpdatedCompanyEventParticipants
              });
            } else {
              return res.status(500).json({
                error: "User Id Not Exist"
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "User Id Not Exist"
            });
          });
      } else {
        return res.status(500).json({
          error: "User Id Not Exist"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "User Id Not Exist"
      });
    });
};
// Register Event API End

// AllRegisterEvent Return API Start
const AllRegisterEvent = (req, res) => {
  const { pageNumber, userid } = req.params;

  const options = {
    page: pageNumber,
    limit: 10,
    collation: {
      locale: "en"
    }
  };

  Student.find({ userid: userid }, "registeredevents")
    .then(RegisteredEvents => {
      if (RegisteredEvents) {
        let getEventArray = RegisteredEvents[0].registeredevents;

        Event.paginate({ _id: { $in: getEventArray } }, options)
          .then(AllEvents => {
            if (AllEvents) {
              return res.status(200).json({
                error: null,
                events: AllEvents
              });
            } else {
              return res.status(500).json({
                error: "User Id Not Exist"
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "User Id Not Exist"
            });
          });
      } else {
        return res.status(500).json({
          error: "User Id Not Exist"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "User Id Not Exist"
      });
    });
};
// AllRegisterEventReturn API End

// Cancel API Start
const CancelRegisterEvent = (req, res) => {
  const data = req.body;

  const { userid, eventid } = data;

  Event.findOneAndUpdate(
    { _id: eventid },
    { $pull: { eventparticipants: userid } },
    { new: true }
  )
    .then(UpdatedRegisterEvent => {
      if (UpdatedRegisterEvent) {
        Student.findOneAndUpdate(
          { userid: userid },
          { $pull: { registeredevents: eventid } },
          { new: true }
        )
          .then(UpdatedsRegisterEvent => {
            if (UpdatedsRegisterEvent) {
              return res.status(200).json({
                error: null
              });
            } else {
              return res.status(500).json({
                error: "User Id Not Exist"
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "User Id Not Exist"
            });
          });
      } else {
        return res.status(500).json({
          error: "User Id Not Exist"
        });
      }
    })
    .catch(err => {
      return res.status(500).json({
        error: "User Id Not Exist"
      });
    });
};
// Cancel API End

//Search Event Information View start
const SearchEvent = (req, res) => {
  const { pageNumber, title, venue, field, eventType, userid } = req.params;

  let filter_object = { status: "active" };
  if (title !== "null") {
    let pair = { title: { $regex: title, $options: "i" } };
    filter_object = { ...filter_object, ...pair };
  }
  if (venue !== "null") {
    let pair = { venue: { $regex: venue, $options: "i" } };
    filter_object = { ...filter_object, ...pair };
  }
  if (eventType !== "null") {
    let pair = { eventType: eventType };
    filter_object = { ...filter_object, ...pair };
  }
  if (field !== "null") {
    let pair = {
      field: { $elemMatch: { $regex: field, $options: "i" } }
    };
    filter_object = { ...filter_object, ...pair };
  }
  const options = {
    page: pageNumber,
    limit: 20,
    collation: {
      locale: "en"
    }
  };

  Event.paginate(filter_object, options)
    .then(events => {
      if (events) {
        Student.find({ userid: userid }, "registeredevents")
          .then(studentDoc => {
            if (studentDoc) {
              return res.status(200).json({
                error: null,
                events: events,
                studentDoc: studentDoc
              });
            } else {
              return res.status(500).json({
                error: "User Id Not Exist"
              });
            }
          })
          .catch(err => {
            return res.status(500).json({
              error: "User Id Not Exist"
            });
          });
      }
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
  ViewAllEvent,
  RegisterEvent,
  AllRegisterEvent,
  CancelRegisterEvent,
  SearchEvent
};
