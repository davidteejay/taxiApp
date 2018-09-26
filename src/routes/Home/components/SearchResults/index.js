import React, { Component } from 'react';
import { Text } from 'react-native';
import { ListItem, View, List, Left, Body } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './styles';
// import { getSelectedAddress } from '../../modules/home';

export default class SearchResults extends Component {
    handleSelectedAddress(placeID){
        this.props.getSelectedAddress(placeID)
    }

    render(){
        return (
            <View style={styles.searchResultsWrapper}>
                <List
                    dataArray={this.props.predictions}
                    renderRow={(item) => {
                        return (<View>
                            <ListItem onPress={this.handleSelectedAddress.bind(this, item.placeID)} button avatar>
                                <Left style={styles.leftContainer}>
                                    <Icon name="location-on" style={styles.leftIcon}/>
                                </Left>
                                <Body>
                                    <Text style={styles.primaryText}>{item.primaryText}</Text>
                                    <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                                </Body>
                            </ListItem>
                        </View>)
                    }}
                />
            </View>
        )
    }
}