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
import React from 'react'
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native'

/**
 * ### Router-Flux
 *
 * Necessary components from Router-Flux
 */
import {
  Router,
  Scene
} from 'react-native-router-flux'

/**
 * ### Redux
 *
 * ```Provider``` will tie the React-Native to the Redux store
 */
import {
  Provider
} from 'react-redux'

/**
 * ### configureStore
 *
 *  ```configureStore``` will connect the ```reducers```, the
 *
 */
import configureStore from './lib/configureStore'

/**
 * ### Translations
 */
var I18n = require('react-native-i18n')

// Support fallbacks so en-US & en-BR both use en
I18n.fallbacks = true

import Translations from './lib/Translations'
I18n.translations = Translations

/**
 * ### modules
 *
 * All the top level modules
 *
 */
import App from './modules/App'
import Login from './modules/user/LoginView'
import Logout from './modules/user/LogoutView'
import Register from './modules/user/RegisterView'
import ForgotPassword from './modules/user/ForgotPasswordView'
import Profile from './modules/user/AccountView'
import Main from './modules/home/HomeView'
import Subview from './modules/Subview'

/**
 * ### icons
 *
 * Add icon support for use in Tabbar
 *
 */
import Icon from 'react-native-vector-icons/FontAwesome'

/**
 * ## Actions
 *  The necessary actions for dispatching our bootstrap values
 */
import {setPlatform, setVersion} from './reducers/device/deviceActions'
import {setStore} from './reducers/global/globalActions'

/**
 * ## States
 * snabbPartner explicitly defines initial state
 *
 */
import AuthInitialState from './reducers/auth/authInitialState'
import DeviceInitialState from './reducers/device/deviceInitialState'
import GlobalInitialState from './reducers/global/globalInitialState'
import ProfileInitialState from './reducers/profile/profileInitialState'

/**
 *  The version of the app but not  displayed yet
 */
import pack from '../package'
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
    height: 70
  }
})

/**
 * ## TabIcon
 *
 * Displays the icon for the tab w/ color dependent upon selection
 */
class TabIcon extends React.Component {
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
                     component={Register}
                     type='replace'/>

              <Scene key='Login'
                     component={Login}
                     type='replace'/>

              <Scene key='Register'
                     component={Register}
                     type='replace'/>

              <Scene key='ForgotPassword'
                     component={ForgotPassword}
                     type='replace'/>

              <Scene key='Subview'
                     component={Subview}/>

              <Scene key='Tabbar'
                     tabs
                     hideNavBar
                     tabBarStyle={styles.tabBar}
                     default='Main'>

                <Scene key='Home'
                       title={I18n.t('Navigation.home')}
                       iconName={'home'}
                       icon={TabIcon}
                       hideNavBar
                       component={Main}
                       initial/>

                <Scene key='Earnings'
                       title={I18n.t('Navigation.earnings')}
                       icon={TabIcon}
                       iconName={'sign-out'}
                       hideNavBar
                       component={Logout}/>

                <Scene key='Ratings'
                       title={I18n.t('Navigation.ratings')}
                       icon={TabIcon}
                       iconName={'star'}
                       hideNavBar
                       component={Logout}/>

                <Scene key='Account'
                       title={I18n.t('Navigation.account')}
                       icon={TabIcon}
                       iconName={'star'}
                       hideNavBar
                       component={Profile}/>
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
