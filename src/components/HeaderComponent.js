import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

function HeaderComponent(props) {
  return <View style={[styles.container, props.style]}><Text style={styles.podcast}>PODCAST</Text></View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E6E6E6",
    flexDirection: 'row',
  },
  podcast: {
    alignSelf: 'stretch',
    fontFamily: "roboto-700",
    color: "#121212",
    opacity: 0.53,
    lineHeight: 15,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default HeaderComponent;
