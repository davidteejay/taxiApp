import { Dimensions, StyleSheet } from 'react-native';

export default StyleSheet.create({
    searchBox: {
        top: 0,
        position: 'absolute',
        width: Dimensions.get('window').width,
    },
    inputWrapper: {
        backgroundColor: '#fff',
        opacity: 0.6,
        paddingHorizontal: 10
    },
    inputSearch: {
        fontSize: 14
    },
    label: {
        fontSize: 10,
        fontStyle: 'italic',
        marginLeft: 10,
        marginTop: 10,
    }
})