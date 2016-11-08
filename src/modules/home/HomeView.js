/**
 * # HomeView.js
 *  This is the main entry point of the application after authentication has been successfully performed.
 */

'use strict'

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as authActions from "../../reducers/auth/authActions"
import * as globalActions from "../../reducers/global/globalActions"
import {Actions} from "react-native-router-flux"
import Header from "../../components/Header"
import React, {Component} from "react"
import {StyleSheet} from "react-native"
import I18n from "../../lib/I18n"
import {Button} from "native-base"
import {View, Content} from "native-base"
import GoOnlineNavBar from "../../components/GoOnlineNavBar"


/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which HomeView.js will depend on.
 */
function mapStateToProps (state) {
  return {
    auth: {
      form: {
        isFetching: state.auth.form.isFetching
      }
    },
    global: {
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
}

/*
 * Bind all the actions
 */
function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators({ ...authActions, ...globalActions }, dispatch)
  }
}

/**
 * ## App class
 */
class HomeView extends Component {

  handlePress () {
    Actions.Subview({
      title: 'Subview'
      // you can add additional props to be passed to Subview here...
    })
  }

  render () {
    return (
      <Content>
        <GoOnlineNavBar title={"Hola"}/>
        <View>
          <Header isFetching={this.props.auth.form.isFetching}
            showState={this.props.global.showState}
            currentState={this.props.global.currentState}
            onGetState={this.props.actions.getState}
            onSetState={this.props.actions.setState} />

          <Button style={styles.button} onPress={this.handlePress.bind(this)}>
            {I18n.t('Navigation.home')}
          </Button>
        </View>
      </Content>
    )
  }
}

var styles = StyleSheet.create({
  summary: {
    fontFamily: 'BodoniSvtyTwoITCTT-Book',
    fontSize: 18,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#FF3366',
    borderColor: '#FF3366',
    marginLeft: 10,
    marginRight: 10
  }
})

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
