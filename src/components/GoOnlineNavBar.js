import React, {Component} from "react";
import {TouchableHighlight, StyleSheet, View} from "react-native";
import NavBar, {NavButtonText, NavButton} from "react-native-nav";
import {Actions} from "react-native-router-flux";

export default class GoOnlineNavBar extends Component {

  goOnlinePress() {
    //TODO - Go Online
    alert('GO ONLINE')
  }

  render() {
    return (
      <View style={{backgroundColor: "#2D2D2D"}}>
        <NavBar>
          <NavButton>
          </NavButton>
          <NavButton style={{
            backgroundColor: "#FF9900",
            paddingTop: 5,
            paddingBottom: 5,
            paddingRight: 15,
            paddingLeft: 15
          }}>
            <NavButtonText style={{color: "#FFFFFF"}}>
              {"GO ONLINE"}
            </NavButtonText>
          </NavButton>
          <NavButton/>
        </NavBar>
      </View>
    )
  }
}
