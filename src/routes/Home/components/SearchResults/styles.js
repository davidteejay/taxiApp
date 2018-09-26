import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    searchResultsWrapper: {
        top: 170,
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: 1000,
        backgroundColor: '#fff',
        opacity: 0.6,
    },
    primaryText: {
        fontWeight: 'bold',
        color: '#373737',
    },
    secondaryText: {
        fontStyle: 'italic',
        color: '#707070',
    },
    leftContainer: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        borderLeftColor: '#707070',
    },
    leftIcon: {
        fontSize: 20,
        color: '#707070'
    },
    distance: {
        fontSize: 12
    }
})