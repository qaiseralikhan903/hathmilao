import React from "react";

// reactstrap components
import {
  Input,
  Alert,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText
} from "reactstrap";

class MultipleArrayInput extends React.Component {
  constructor(props) {
    super(props);
    this.onAddItem = this.onAddItem.bind(this);
    this.state = {
      textValue: "",
      textArray: [],
      error: "",
      visible: false
    };
  }

  componentWillMount() {
    this.setState({
      textArray: this.props.array
    });
  }

  onDismiss = () => {
    this.setState({ visible: false });
  };

  onChangeValue = event => {
    this.setState({ textValue: event.target.value });
  };

  onAddItem(event) {
    let { textValue, textArray } = this.state;

    if (textValue.length < 1) {
      this.setState({
        error: "Please Enter The Text",
        visible: true
      });
      return;
    }

    if (this.state.textArray.length > 0) {
      for (let i = 0; i < textArray.length; i++) {
        let element = textArray[i];
        if (element.toLowerCase() === textValue.toLowerCase()) {
          this.setState({
            error: element.toUpperCase() + " already added in list ",
            visible: true
          });
          return;
        }
      }
    }
    this.setState(
      state => {
        const textArray = state.textArray.concat(state.textValue);
        return {
          textArray,
          textValue: "",
          error: "",
          visible: false
        };
      },
      () => {
        this.props.methodfromparent(this.state.textArray);
      }
    );
  }

  onRemoveItem = i => {
    this.setState(
      state => {
        const textArray = state.textArray.filter((item, j) => i !== j);

        return {
          textArray
        };
      },
      () => {
        this.props.methodfromparent(this.state.textArray);
      }
    );
  };

  keyPressed = event => {
    if (event.key === "Enter") {
      this.onAddItem();
    }
  };

  render() {
    return (
      <>
        <Alert
          color="danger"
          isOpen={this.state.visible}
          toggle={this.onDismiss}
        >
          {this.state.error}
        </Alert>

        <FormGroup>
          <InputGroup className="mb-4">
            <Input
              type="text"
              name="skill"
              value={this.state.textValue}
              onChange={this.onChangeValue}
              placeholder={this.props.placeHolderString}
              onKeyPress={this.keyPressed}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText className="tag-add" onClick={this.onAddItem}>
                <i className="fas fa-plus --blue" />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>

        <p>
          {(this.state.textArray || []).map((item, index) => (
            <span className="tag-setting" key={index}>
              {item} &nbsp;
              <i
                className="fa fa-times tag-icon"
                onClick={() => this.onRemoveItem(index)}
              />
            </span>
          ))}
        </p>
      </>
    );
  }
}

export default MultipleArrayInput;
