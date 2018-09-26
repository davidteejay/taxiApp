import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    fareContainer: {
        width: Dimensions.get('window').width,
        height: 40,
        padding: 10,
        backgroundColor: 'orange',
    },
    fareText: {
        fontSize: 14,
    },
    amount: {
        fontWeight: 'bold',
        fontSize: 14
    }
})