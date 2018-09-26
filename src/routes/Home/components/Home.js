import React, { Component } from 'react';
import { BackHandler } from 'react-native';
import { Container } from 'native-base';

import MapContainer from './MapContainer/';
import Header from '../../../components/Header/';
import Footer from '../../../components/Footer/';
import Fare from './Fare';
import FAB from './FAB';

export default class Home extends Component {
    componentDidMount(){
        this.props.getCurrentLocation();

        BackHandler.addEventListener('hardwareBackPress', this.exit.bind(this))
    }

    componentWillUnmount(){
        BackHandler.removeEventListener('hardwareBackPress', this.exit.bind(this))
    }

    exit(){
        BackHandler.exitApp();
    }

    render(){
        return (
            <Container>
                <Header/>
                {this.props.region.latitude && <MapContainer 
                    region={this.props.region}
                    getInput={this.props.getInput}
                    toggleSearch={this.props.toggleSearch}
                    getAddressPredictions={this.props.getAddressPredictions}
                    resultTypes={this.props.resultTypes}
                    predictions={this.props.predictions}
                    getSelectedAddress={this.props.getSelectedAddress}
                    selectedAddress={this.props.selectedAddress}
                />}
                <FAB onPressAction={this.props.bookCar}/>
                {this.props.fare && <Fare fare={this.props.fare}/>}
                <Footer/>
            </Container>
        )
    }
}