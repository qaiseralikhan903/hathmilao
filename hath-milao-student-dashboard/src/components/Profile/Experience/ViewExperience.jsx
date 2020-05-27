import React, { Component } from "react";
import { Button } from "reactstrap";

// Experience Components
import AddExperience from "./AddExperience";
import AllExperience from "./AllExperience";

export default class ViewExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ExperienceOption: "all"
    };
  }

  // Handle Add Experience Button
  onAddChange = () => {
    this.setState({
      ExperienceOption: "Add"
    });
  };

  // Handle Back Buttton
  onBackChange = () => {
    this.setState({
      ExperienceOption: "All"
    });
  };

  render() {
    let show;
    if (this.state.ExperienceOption === "Add") {
      show = <AddExperience />;
    } else {
      show = <AllExperience {...this.props} />;
    }

    return (
      <React.Fragment>
        {this.state.ExperienceOption === "Add" ? (
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
              Add Experience
            </Button>
          </div>
        )}
        <br />
        {show}
      </React.Fragment>
    );
  }
}
