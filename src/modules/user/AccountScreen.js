/**
 * # Profile.js
 *
 * This component provides an interface for a logged in user to change
 * their username and email.
 * It too is a container so there is boilerplate from Redux similar to
 * ```App``` and ```Login```
 */
'use strict'
/**
 * ## Imports
 *
 * Redux
 */
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import {Actions} from "react-native-router-flux"
import * as profileActions from "../../reducers/profile/profileActions"
import * as globalActions from "../../reducers/global/globalActions"
import ErrorAlert from "../../components/ErrorAlert"
import React, {Component} from "react"
import {StyleSheet, ScrollView, Dimensions} from "react-native"
import t from "tcomb-form-native"
import I18n from '../../lib/I18n'
import {View, Icon, Badge, List, Text, ListItem, Content} from "native-base"
import GoOnlineNavBar from "../../components/GoOnlineNavBar"
import UserProfileImage from "../user/components/UserProfileImage";

const {width, height} = Dimensions.get('window');


/**
 * ## Redux boilerplate
 */

function mapStateToProps(state) {
  return {
    global: {
      currentUser: state.global.currentUser,
      currentState: state.global.currentState,
      showState: state.global.showState
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...profileActions, ...globalActions}, dispatch)
  }
}

class AccountScreen extends Component {
  /**
   * ## Profile class
   * Set the initial state and prepare the errorAlert
   */
  constructor(props) {
    super(props)
    this.errorAlert = new ErrorAlert()
    this.state = {
      accountValues: {
        username: '',
        email: ''
      }
    }
  }

  /**
   * ### componentWillReceiveProps
   *
   * Since the Forms are looking at the state for the values of the
   * fields, when we we need to set them
   */
  componentWillReceiveProps(props) {
    this.setState({
      accountValues: {
        username: props.global.currentUser.username,
        email: props.global.currentUser.email
      }
    })
  }

  /**
   * ### componentDidMount
   **/
  componentDidMount() {
    this.props.actions.getProfile(this.props.global.currentUser)
  }

  handleHelpPress() {
    Actions.HelpScreen()
  }

  handleSettingsPress() {
    Actions.SettingsScreen()
  }

  handleAboutPress() {
    Actions.AboutScreen()
  }

  /**
   * ### render
   * display the form wrapped with the header and button
   */
  render() {
    return (
      <View>
        <GoOnlineNavBar/>
        <Content>
          <View style={{height: 230}}>
            <View style={{marginTop: 20, alignItems: 'center'}}>
              <UserProfileImage style={styles.userProfile} onPress={() => this.openControlPanel()}/>
              <Text style={styles.userName}>{this.props.global.currentUser.username}</Text>
            </View>

            <View style={{flexDirection: 'row', marginTop: 10, paddingRight: 30, paddingLeft: 30}}>
              <View style={{padding: 10, marginRight: 1, flex: 1, backgroundColor: '#FF0505', alignItems: 'center'}}>
                <Icon name='ios-star'/>
                <Text>4.9</Text>
                <Text>Rating</Text>
              </View>
              <View style={{padding: 10, marginLeft: 2, flex: 1, backgroundColor: '#FF0505', alignItems: 'center'}}>
                <Icon name='ios-car'/>
                <Text>129</Text>
                <Text>Rides</Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: 50, marginRight: 30, marginLeft: 30, height: 1, backgroundColor: '#C2C2C2'}}/>
          <List>
            <ListItem button iconLeft iconRight onPress={this.handleHelpPress.bind(this)}>
              <Icon name='ios-help-circle-outline'/>
              <Text>Help</Text>
              <Icon name='ios-arrow-forward'/>
            </ListItem>
            <ListItem button iconLeft iconRight onPress={this.handleSettingsPress.bind(this)}>
              <Icon name='ios-settings-outline'/>
              <Text>Settings</Text>
              <Icon name='ios-arrow-forward'/>
            </ListItem>
            <ListItem button iconLeft iconRight onPress={this.handleAboutPress.bind(this)}>
              <Icon name='ios-information-circle-outline'/>
              <Text>About</Text>
              <Icon name='ios-arrow-forward'/>
            </ListItem>
          </List>
        </Content>
      </View>
    )
  }
}

/**
 * ## Styles
 */
const styles = StyleSheet.create({
  userProfile: {},
  userName: {
    marginTop: 10,
    padding: 10,
    fontSize: 30,
    color: '#000000'
  }
})


{/*<Header isFetching={this.props.profile.form.isFetching}*/
}
{/*showState={this.props.global.showState}*/
}
{/*currentState={this.props.global.currentState}*/
}
{/*onGetState={this.props.actions.getState}*/
}
{/*onSetState={this.props.actions.setState}*/
}
{/*/>*/
}
//<View style={styles.inputs}>
// <Form
// ref='form'
// type={ProfileForm}
// options={options}
// value={this.state.formValues}
// onChange={this.onChange.bind(self)}
// />
// <ItemCheckbox text={verfiedText}
// disabled
// checked={this.props.profile.form.fields.emailVerified}/>
// </View>
//
// <FormButton
// isDisabled={!this.props.profile.form.isValid || this.props.profile.form.isFetching}
// onPress={onButtonPress.bind(self)}
// buttonText={profileButtonText}/>

export default connect(mapStateToProps, mapDispatchToProps)(AccountScreen)
