'use strict'
/**
 *  # snabbPartner
 *  snabbPartner ![snabbPartner](https://cloud.githubusercontent.com/assets/1282364/11599365/1a1c39d2-9a8c-11e5-8819-bc1e48b30525.png)
 */

/**
 * ## imports
 *
 */
/**
 * ### React
 *
 * Necessary components from ReactNative
 */
import React from "react"
import {AppRegistry, StyleSheet, View, Text} from "react-native"
import {Router, Scene} from "react-native-router-flux"
import {Provider} from "react-redux"
import configureStore from "./lib/configureStore"
import App from "./modules/App"
import LoginScreen from "./modules/user/LoginScreen"
import LogoutScreen from "./modules/user/LogoutSceen"
import RegisterScreen from "./modules/user/RegisterScreen"
import ForgotPasswordScreen from "./modules/user/ForgotPasswordScreen"
import AccountScreen from "./modules/user/AccountScreen"
import HomeScreen from "./modules/home/HomeScreen"
import EarningsScreen from "./modules/earnings/EarningsScreen"
import RatingsScreen from "./modules/ratings/RatingsScreen"
import SubviewScreen from "./modules/SubviewScreen"
import {setPlatform, setVersion} from "./reducers/device/deviceActions"
import {setStore} from "./reducers/global/globalActions"
import AuthInitialState from "./reducers/auth/authInitialState"
import DeviceInitialState from "./reducers/device/deviceInitialState"
import GlobalInitialState from "./reducers/global/globalInitialState"
import ProfileInitialState from "./reducers/profile/profileInitialState"
import pack from "../package"
import I18n from './lib/I18n'
import Icon from "react-native-vector-icons/Ionicons"
import {Component} from "react"


/**
 *  The version of the app but not  displayed yet
 */
var VERSION = pack.version

/**
 *
 * ## Initial state
 * Create instances for the keys of each structure in snabbPartner
 * @returns {Object} object with 4 keys
 */
function getInitialState() {
  const _initState = {
    auth: new AuthInitialState(),
    device: (new DeviceInitialState()).set('isMobile', true),
    global: (new GlobalInitialState()),
    profile: new ProfileInitialState()
  }
  return _initState
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#2D2D2D',
    height: 70
  }
})

class TabIcon extends Component {

  render() {
    var color = this.props.selected ? '#FF3366' : '#FFB3B3'
    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
        <Icon style={{color: color}} name={this.props.iconName} size={30}/>
        <Text style={{color: color}}>{this.props.title}</Text>
      </View>
    )
  }
}


/**
 * ## Native
 *
 * ```configureStore``` with the ```initialState``` and set the
 * ```platform``` and ```version``` into the store by ```dispatch```.
 * *Note* the ```store``` itself is set into the ```store```.  This
 * will be used when doing hot loading
 */

export default function native(platform) {
  let snabbPartner = React.createClass({
    render () {
      const store = configureStore(getInitialState())

      // configureStore will combine reducers from snabbPartner and main application
      // it will then create the store based on aggregate state from all reducers
      store.dispatch(setPlatform(platform))
      store.dispatch(setVersion(VERSION))
      store.dispatch(setStore(store))

      // setup the router table with App selected as the initial component
      // note: See https://github.com/aksonov/react-native-router-flux/issues/948
      return (

        <Provider store={store}>
          <Router sceneStyle={{backgroundColor: 'white'}}>
            <Scene key='root' hideNavBar>
              <Scene key='App'
                     component={App}
                     type='replace'
                     initial/>

              <Scene key='InitialLoginForm'
                     component={RegisterScreen}
                     type='replace'/>

              <Scene key='Login'
                     component={LoginScreen}
                     type='replace'/>

              <Scene key='Register'
                     component={RegisterScreen}
                     type='replace'/>

              <Scene key='ForgotPassword'
                     component={ForgotPasswordScreen}
                     type='replace'/>

              <Scene key='Subview'
                     component={SubviewScreen}/>

              <Scene key='Tabbar'
                     tabs
                     hideNavBar
                     tabBarStyle={styles.tabBar}
                     default='Home'>

                <Scene key='Home'
                       title={I18n.t('Navigation.home')}
                       iconName={'ios-home'}
                       icon={TabIcon}
                       hideNavBar
                       component={HomeScreen}
                       initial/>

                {/*<Scene key='Earnings'*/}
                       {/*title={I18n.t('Navigation.earnings')}*/}
                       {/*icon={TabIcon}*/}
                       {/*iconName={'ios-stats'}*/}
                       {/*hideNavBar*/}
                       {/*component={EarningsScreen}/>*/}

                {/*<Scene key='Ratings'*/}
                       {/*title={I18n.t('Navigation.ratings')}*/}
                       {/*icon={TabIcon}*/}
                       {/*iconName={'ios-star'}*/}
                       {/*hideNavBar*/}
                       {/*component={RatingsScreen}/>*/}

                <Scene key='Account'
                       title={I18n.t('Navigation.account')}
                       icon={TabIcon}
                       iconName={'ios-person'}
                       hideNavBar
                       component={AccountScreen}/>
              </Scene>
            </Scene>
          </Router>
        </Provider>
      )
    }
  })
  /**
   * registerComponent to the AppRegistery and off we go....
   */

  AppRegistry.registerComponent('snabbPartner', () => snabbPartner)
}
