import React, { Component } from 'react';
import { Text } from 'react-native';
import { View, Button } from 'native-base';

import styles from './styles';

export default class FAB extends Component {
    render(){
        return (
            <Button style={{...styles.fabContainer, ...styles.activeState}} onPress={this.props.onPressAction}>
                <Text style={styles.btnText}>Book</Text>
            </Button>
        )
    }
}