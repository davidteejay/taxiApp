import React, { Component } from 'react';
import { FooterTab, Footer as FooterComp, Button} from 'native-base';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

export default class Footer extends Component {
    render(){
        const tabs = [
            {
                title: "TaxiCar",
                subtitle: "",
                icon: "car"
            },
            {
                title: "TaxiShare",
                subtitle: "",
                icon: "car"
            },
            {
                title: "TaxiPremium",
                subtitle: "",
                icon: "car"
            },
            {
                title: "Bike",
                subtitle: "",
                icon: "car"
            }
        ]

        return (
            <FooterComp>
                <FooterTab 
                    style={styles.container}
                >
                    {tabs.map((tab, i) => {
                        return (
                            <Button key={i}>
                                <Icon size={20} name={tab.icon} color={(i === 0) ? "orange" : "#ccc"}/>
                                <Text style={{ fontSize: 14, color: (i === 0) ? "orange" : "#ccc" }}>{tab.title}</Text>
                                <Text style={styles.subtext}>{tab.subtitle}</Text>
                            </Button>
                        )
                    })}
                </FooterTab>
            </FooterComp>
        )
    }
}