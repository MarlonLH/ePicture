import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import BottomNavbar  from './src/BottomNavbar/BottomNavbar'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <BottomNavbar />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});