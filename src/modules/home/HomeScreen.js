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
import {StyleSheet, Dimensions, TouchableOpacity} from "react-native"
import I18n from "../../lib/I18n"
import {Button} from "native-base"
import {View, Text, Content} from "native-base"
import MapView from "react-native-maps";
import GoOnlineNavBar from "../../components/GoOnlineNavBar"

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


/**
 *  Instead of including all app states via ...state
 *  One could explicitly enumerate only those which HomeScreen.js will depend on.
 */
function mapStateToProps(state) {
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
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...authActions, ...globalActions}, dispatch)
  }
}

/**
 * ## App class
 */
class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
    };
  }

  onGoOnlinePress() {
    alert('Go Online!')
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref={ref => {
            this.map = ref;
          }}
          style={styles.map}
          showsUserLocation={true}
          initialRegion={this.state.region}
          onRegionChange={region => this.onRegionChange(region)}>

          <GoOnlineNavBar/>
        </MapView>
      </View>
    )
  }
}



// <View>
// <Header isFetching={this.props.auth.form.isFetching}
// showState={this.props.global.showState}
// currentState={this.props.global.currentState}s
// onGetState={this.props.actions.getState}
// onSetState={this.props.actions.setState}/>
//
// <Button style={styles.button} onPress={this.handlePress.bind(this)}>
// {I18n.t('Navigation.home')}
// </Button>
// </View>

var styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
})

/**
 * Connect the properties
 */
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
