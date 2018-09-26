import React, { Component } from 'react';
import { Text } from 'react-native';
import { InputGroup, View, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

export default class SearchBox extends Component {
    handleInput(key, value){
        this.props.getInput({
            key,
            value
        });
        this.props.getAddressPredictions()
    }

    render(){
        const { selectedPickUp, selectedDropOff } = this.props.selectedAddress || {}

        return (
            <View style={styles.searchBox}>
                <View style={{ ...styles.inputWrapper, borderBottomColor: '#ccc', borderBottomWidth: 1, borderStyle: 'solid' }}>
                    <Text style={styles.label}>Pick Up</Text>
                    <InputGroup>
                        <Icon name="search" size={15} color="#ff5e3a"/>
                        <Input 
                            style={styles.inputSearch} 
                            placeholder="Choose Pick up Location" 
                            onChangeText={this.handleInput.bind(this, "pickup")} 
                            onFocus={() => this.props.toggleSearch("pickup")} 
                            value={selectedPickUp && selectedPickUp.name}/>
                    </InputGroup>
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Drop Off</Text>
                    <InputGroup>
                        <Icon name="search" size={15} color="#ff5e3a"/>
                        <Input 
                            style={styles.inputSearch} 
                            placeholder="Choose Drop off Location" 
                            onChangeText={this.handleInput.bind(this, "dropoff")} 
                            onFocus={() => this.props.toggleSearch("dropoff")}
                            value={selectedDropOff && selectedDropOff.name}/>
                    </InputGroup>
                </View>
            </View>
        )
    }
}