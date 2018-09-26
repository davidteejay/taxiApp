import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Root from './src/main';

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Root {...this.props}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});