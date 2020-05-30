/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-use-before-define */
/* eslint-disable react/sort-comp */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-state */

import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";


export default class Accordian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false
    };
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          style={styles.row}
          onPress={() => this.toggleExpand()}
        >
          <Text style={[styles.title]}>{this.props.title}</Text>
          <Icon
            name={
              this.state.expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"
            }
            size={30}
            color="darkgrey"
          />
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {this.state.expanded && (
          <View style={{}}>
            <FlatList
              data={this.state.data}
              numColumns={1}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <View>
                  <TouchableOpacity
                    style={[
                      styles.childRow,
                      styles.button,
                      item.value ? styles.btnInActive : styles.btnActive
                    ]}
                    onPress={() => this.onClick(index)}
                  >
                    <Text style={[styles.font, styles.itemInActive]}>
                      {item.key}
                    </Text>
                    
                  </TouchableOpacity>
                  <View style={styles.childHr} />
                </View>
              )}
            />
          </View>
        )}
      </View>
    );
  }

  onClick = index => {
    const temp = this.state.data.slice();
    temp[index].value = !temp[index].value;
    this.setState({ data: temp });
  };

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded });
  };
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: "100%",
    height: 54,
    alignItems: "center",
    paddingLeft: 35,
    paddingRight: 35,
    fontSize: 12
  },
  title: {
    fontSize: 14,
    fontWeight: "900",
    color: "darkgrey"
  },
  itemActive: {
    fontSize: 12,
    color: "green"
  },
  itemInActive: {
    fontSize: 12,
    color: "darkgrey"
  },
  btnActive: {
    borderColor: "green"
  },
  btnInActive: {
    borderColor: "darkgrey"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: "center",
    backgroundColor: "white"
  },
  childRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white"
  },
  parentHr: {
    height: 1,
    color: "white",
    width: "100%"
  },
  childHr: {
    height: 1,
    backgroundColor: "lightgrey",
    width: "100%"
  },
  colorActive: {
    borderColor: "green"
  },
  colorInActive: {
    borderColor: "darkgrey"
  }
});
