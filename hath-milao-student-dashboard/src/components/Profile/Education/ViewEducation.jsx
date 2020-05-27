import React, { Component } from "react";
import { Button } from "reactstrap";

// Education Components
import AddEducation from "./AddEducation";
import AllEducation from "./AllEducation";

export default class ViewEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EducationOption: "all"
    };
  }

  // Handle Add Education Button
  onAddChange = () => {
    this.setState({
      EducationOption: "Add"
    });
  };

  // Handle Back Buttton
  onBackChange = () => {
    this.setState({
      EducationOption: "All"
    });
  };

  render() {
    let show;
    if (this.state.EducationOption === "Add") {
      show = <AddEducation />;
    } else {
      show = <AllEducation {...this.props} />;
    }

    return (
      <React.Fragment>
        {this.state.EducationOption === "Add" ? (
          <div>
            <Button
              color="default"
              size="sm"
              type="button"
              onClick={this.onBackChange}
            >
              Back
            </Button>
          </div>
        ) : (
          <div>
            <Button
              color="primary"
              size="sm"
              type="button"
              onClick={this.onAddChange}
            >
              Add Education
            </Button>
          </div>
        )}
        <br />
        {show}
      </React.Fragment>
    );
  }
}
