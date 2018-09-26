import React, { Component } from 'react';
import { Text } from 'react-native';
import { View } from 'native-base';

import styles from './styles';

export default class Fare extends Component {
    render(){
        return (
            <View style={styles.fareContainer}>
                <Text>
                    <Text style={styles.fareText}>FARE: $</Text>
                    <Text style={styles.amount}>
                        {this.props.fare}
                    </Text>
                </Text>
            </View>
        )
    }
}