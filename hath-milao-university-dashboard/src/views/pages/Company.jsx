import React, { Component } from "react";
// core components
import Header from "components/Headers/Header.jsx";
import ViewAllCompany from "components/Company/ViewAllCompany.jsx";
export default class Company extends Component {
  render() {
    return (
      <>
        <Header />
        {/* Page content */}
        <ViewAllCompany {...this.props} />
      </>
    );
  }
}
