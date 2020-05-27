import React, { Component } from "react";
import { Button } from "reactstrap";

// Other Components
import EditOther from "./EditOther";
import AllOther from "./AllOther";

export default class ViewOther extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OtherOption: "all"
    };
  }

  // Handle Add Other Button
  onAddChange = () => {
    this.setState({
      OtherOption: "Edit"
    });
  };

  // Handle Back Buttton
  onBackChange = () => {
    this.setState({
      OtherOption: "All"
    });
  };

  render() {
    let show;
    if (this.state.OtherOption === "Edit") {
      show = <EditOther {...this.props} />;
    } else {
      show = <AllOther {...this.props} />;
    }

    return (
      <React.Fragment>
        {this.state.OtherOption === "Edit" ? (
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
              Edit Other Information
            </Button>
          </div>
        )}
        <br />
        {show}
      </React.Fragment>
    );
  }
}
