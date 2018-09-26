import React, { Component } from 'react';
import { Header as HeaderComponent, Left, Body, Right } from 'native-base';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

export default class Header extends Component {
    render(){
        return (
            <HeaderComponent 
                style={{ backgroundColor: 'orange', paddingHorizontal: 10 }} 
                androidStatusBarColor="orange"
                iosBarStyle="dark-content"
                noShadow={false}
            >
                <Left>
                    <Icon name="bars" style={styles.icon}/>
                </Left>
                <Body style={{margin: 0, padding: 0}}>
                    <Text style={styles.text}>Taxi App</Text>
                </Body>
                <Right>
                    <Icon name="search" style={styles.icon}/>
                </Right>
            </HeaderComponent>
        )
    }
}