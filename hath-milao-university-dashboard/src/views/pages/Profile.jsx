import React from "react";

// core components
import Header from "components/Headers/Header.jsx";

//Profile Components
import ViewProfile from "../../components/Profile/ViewProfile";
import AddProfile from "../../components/Profile/AddProfile";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setting: false
    };
  }

  viewSetting = data => {
    this.setState(state => {
      state.setting = data;
    });
    this.forceUpdate();
  };

  render() {
    let show;
    if (this.state.setting === true) {
      show = (
        <AddProfile
          user={this.props.user.user}
          {...this.props}
          methodfromparent={this.viewSetting}
        />
      );
    } else {
      show = (
        <ViewProfile
          user={this.props.user.user}
          methodfromparent={this.viewSetting}
        />
      );
    }

    return (
      <>
        <Header />
        {/* Page content */}
        {show}
      </>
    );
  }
}
export default Profile;
