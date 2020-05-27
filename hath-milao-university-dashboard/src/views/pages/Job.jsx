import React from "react";
// core components
import Header from "components/Headers/Header.jsx";

import ViewAllStudents from "components/Student/ViewAllStudents.jsx";

class Job extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <ViewAllStudents {...this.props} />
      </>
    );
  }
}

export default Job;
