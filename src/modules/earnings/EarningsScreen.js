/**
 * # Logout.js
 *
 *
 *
 */
'use strict'

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as authActions from "../../reducers/auth/authActions"
import * as globalActions from "../../reducers/global/globalActions"
import Header from "../../components/Header"
import FormButton from "../../components/FormButton"
import React, {Component} from "react"
import {StyleSheet} from "react-native"
import I18n from "../../lib/I18n"
import {View, Content} from "native-base"
import GoOnlineNavBar from "../../components/GoOnlineNavBar"

/**
 * ## Redux boilerplate
 */

function mapStateToProps(state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching,
        isValid: state.auth.form.isValid
      }
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...authActions, ...globalActions}, dispatch)
  }
}

class EarningsViews extends Component {

  /**
   * ### render
   * Setup some default presentations and render
   */
  render() {
    return (
      <Content>
        <GoOnlineNavBar/>
        <View>
          <Header isFetching={this.props.auth.form.isFetching}
                  showState={this.props.global.showState}
                  currentState={this.props.global.currentState}
                  onGetState={this.props.actions.getState}
                  onSetState={this.props.actions.setState}/>

        </View>
      </Content>
    )
  }
}

/**
 * ## Styles
 */
var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(EarningsViews)
