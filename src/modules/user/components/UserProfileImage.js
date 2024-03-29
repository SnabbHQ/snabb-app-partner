import {Image, View, StyleSheet, TouchableOpacity} from "react-native";
import React from 'react';


class UserProfileImage extends React.Component {
  render() {
    return (
      <View style={this.props.style}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image style={styles.profileImage}/>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  profileImage: {
    backgroundColor: '#AAA',
    borderColor: '#FFFFFF',
    borderWidth: 3,
    height: 100,
    borderRadius: 50,
    width: 100
  }
});

export default UserProfileImage;
