import React, { Component, PureComponent } from "react";
import { StyleSheet, View, ART, Dimensions, Image } from "react-native";
import { Vector } from "matter-js";

class Box extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    const angle = this.props.body.angle;

    return (
      <View
        style={
          {
            position: "absolute",
            left: x,
            top: y,
            width: width,
            height: height,
            zIndex: 2,
            transform: [{ rotate: angle + "rad" }],
            backgroundColor: this.props.color || "pink"
          }
        }
      />
    );
  }
}

class Ball extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;
    const angle = this.props.body.angle;

    return (
      <Image source={require('../../assets/flappy/soccer.png')}
        style={
          {
            position: "absolute",
            left: x,
            top: y,
            width: width,
            height: height,
            transform: [{ rotate: angle + "rad" }],
          }
        }
      />
    );
  }
}

class Floor extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    return (
      <Image source={require('../../assets/flappy/base.png')}
        style={
          {
            position: "absolute",
            left: x,
            top: y,
            width: width,
            height: height,
            resizeMode: "repeat"
          }
        }
      />
    );
  }
}

class Background extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const width = this.props.size[0];
    const height = this.props.size[1];
    const x = this.props.body.position.x - width / 2;
    const y = this.props.body.position.y - height / 2;

    const source = this.props.backgroundUri ? { uri: this.props.backgroundUri } : require('../../assets/logo.png')

    return (
      <Image source={source} blurRadius={4}
        style={
          {
            backgroundColor: '#CCC',
            position: "absolute",
            opacity: 0.2,
            left: x,
            top: y,
            width: width,
            height: height,
            resizeMode: "cover",
          }
        }
      />
    );
  }
}

export {
  Box,
  Ball,
  Floor,
  Background,
};
