import React, { Component } from 'react';
import { View } from 'native-base';
import MapView, { Marker } from 'react-native-maps';

import styles from './styles';
import SearchBox from '../SearchBox/index';
import SearchResults from '../SearchResults/index';

export default class MapContainer extends Component {
    render(){
        return (
            <View style={styles.container}>
                <MapView
                    provider={MapView.PROVIDER_GOOGLE}
                    style={styles.map}
                    region={this.props.region}
                >
                    <Marker
                        coordinate={this.props.region}
                        pinColor="green"
                    />
                </MapView>
                <SearchBox 
                    getInput={this.props.getInput} 
                    toggleSearch={this.props.toggleSearch} 
                    getAddressPredictions={this.props.getAddressPredictions}
                    selectedAddress={this.props.selectedAddress}
                />
                {(this.props.resultTypes.pickup || this.props.resultTypes.dropoff) &&
                <SearchResults predictions={this.props.predictions}  getSelectedAddress={this.props.getSelectedAddress}/>
                }
            </View>
        )
    }
}