/**
 * # ForgotPassword.js
 *
 */
'use strict'

import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import * as authActions from "../../reducers/auth/authActions"
import LoginRender from "./components/LoginRender"
import React from "react"
import I18n from '../../lib/I18n'

const {
  REGISTER,
  LOGIN,
  FORGOT_PASSWORD
} = require('../../lib/constants').default

/**
 * ## Redux boilerplate
 */
function mapStateToProps(state) {
  return {
    auth: state.auth,
    global: state.global
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
}

function buttonPressHandler(resetPassword, email) {
  resetPassword(email)
}

let ForgotPasswordScreen = React.createClass({

  render () {
    let loginButtonText = I18n.t('ForgotPassword.reset_password')
    let onButtonPress = buttonPressHandler.bind(null,
      this.props.actions.resetPassword,
      this.props.auth.form.fields.email)

    return (
      <LoginRender
        formType={FORGOT_PASSWORD}
        loginButtonText={loginButtonText}
        onButtonPress={onButtonPress}
        displayPasswordCheckbox={false}
        leftMessageType={REGISTER}
        rightMessageType={LOGIN}
        auth={this.props.auth}
        global={this.props.global}
      />
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen)
