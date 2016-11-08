/**
 * # Subview.js
 *
 *  This is called from main to demonstrate the back button
 */
'use strict'

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Actions} from "react-native-router-flux"
import React, {Component}  from "react"
import {StyleSheet, View, Text} from "react-native"
import * as deviceActions from "../../reducers/device/deviceActions"
import DefaultNavBar from "../../components/DefaultNavBar";
import I18n from "../../lib/I18n";


/**
 *  Instead of including all app states via ...state
 *  You probably want to explicitly enumerate only those which HomeScreen.js will depend on.
 *
 */
function mapStateToProps (state) {
  return {
    deviceVersion: state.device.version
  }
}

/*
 * Bind all the actions in deviceActions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(deviceActions, dispatch)
  }
}

class SettingsScreen extends Component {

  render () {
    return (
      <View>
        <DefaultNavBar title='Settings'/>
        <View style={styles.container}>
          <Text style={styles.summary}>Settings</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 80,
    padding: 10
  },
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  }
})



/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
