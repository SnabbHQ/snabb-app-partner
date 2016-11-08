import React, {Component} from "react"
import {TouchableOpacity, StyleSheet, View} from "react-native"
import {Text} from 'native-base'
import NavBar, {NavButtonText, NavButton} from "react-native-nav"
import {Actions} from "react-native-router-flux"

export default class GoOnlineNavBar extends Component {

  goOnlinePress() {
    //TODO - Go Online
    alert('GO ONLINE')
  }

  render() {
    return (
      <View style={{height: 100, backgroundColor: "#2D2D2D"}}>
        <TouchableOpacity style={{backgroundColor: "#000000"}}>
          <Text>Go Online</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

{/*<NavBar>*/}
  {/*<NavButton>*/}
  {/*</NavButton>*/}
  {/*<NavButton style={{*/}
    {/*backgroundColor: "#FF9900",*/}
    {/*paddingTop: 5,*/}
    {/*paddingBottom: 5,*/}
    {/*paddingRight: 15,*/}
    {/*paddingLeft: 15*/}
  {/*}}>*/}
    {/*<NavButtonText style={}>*/}
      {/*{"GO ONLINE"}*/}
    {/*</NavButtonText>*/}
  {/*</NavButton>*/}
  {/*<NavButton/>*/}
{/*</NavBar>*/}
