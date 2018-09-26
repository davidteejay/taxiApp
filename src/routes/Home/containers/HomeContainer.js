import { connect } from 'react-redux';

import { 
    getCurrentLocation,
    getInput,
    toggleSearch,
    getAddressPredictions,
    getSelectedAddress,
    bookCar
} from '../modules/home';
import Home from '../components/Home';

const mapStateToPros = (state) => ({
    region: state.home.region,
    inputData: state.home.inputData || {},
    resultTypes: state.home.resultTypes || {},
    predictions: state.home.predictions || [],
    selectedAddress: state.home.selectedAddress || {},
    fare: state.home.fare,
    booking: state.home.booking || {}
})

const mapActionCreators = {
    getCurrentLocation,
    getInput,
    toggleSearch,
    getAddressPredictions,
    getSelectedAddress,
    bookCar
};

export default connect(mapStateToPros, mapActionCreators)(Home);