import update from 'react-addons-update';
import { Dimensions } from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import axios from 'axios';

import constants from './actionContants';
import fare from '../../../util/fare';

//Contants
const { 
    GET_CURRENT_LOCATION, 
    GET_INPUT, 
    TOGGLE_SEARCH_RESULT,
    GET_ADDRESS_PREDICTIONS,
    GET_SELECTED_ADDRESS,
    GET_DISTANCE,
    GET_FARE,
    BOOK_RIDE
} = constants;
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.009
const LONGITUDE_DELTA = LATITUDE_DELTA;

//Actions
export function getCurrentLocation(){
    return (dispatch) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // console.warn("Gotten");
                dispatch({
                    type: GET_CURRENT_LOCATION,
                    payload: position
                })
            },
            (error) => console.warn(error.message),
            { enableHighAccuracy: false, timeout: 7000, maximumAge: 1000 }
        )
    }
}

export function getInput(payload){
    return {
        type: GET_INPUT,
        payload
    }
}

export function toggleSearch(payload){
    return {
        type: TOGGLE_SEARCH_RESULT,
        payload
    }
}

export function getAddressPredictions(){
    return(dispatch, store) => {
        let userInput = store().home.resultTypes.pickup ? store().home.inputData.pickup : store().home.inputData.dropoff;
        RNGooglePlaces.getAutocompletePredictions(userInput, {
            country: 'NG'
        })
            .then(results => dispatch({
                type: GET_ADDRESS_PREDICTIONS,
                payload: results
            }))
            .catch(err => console.log(err.message))
    }
}

export function getSelectedAddress(payload){
    const variables = {
        baseFare: 0.4,
        timeRate: 0.14,
        distanceRate: 0.97,
        surge: 1,
    }

    return(dispatch, store) => {
        RNGooglePlaces.lookUpPlaceByID(payload)
            .then(result => {
                dispatch({
                    type: GET_SELECTED_ADDRESS,
                    payload: result
                })
            })
            .then(() => {
                if (store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
                    axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?mode=driving&key=AIzaSyBiWgAOyaie2HgTGJDNH3S5amqA8NLpaNk&origins=${store().home.selectedAddress.selectedPickUp.address}&destinations=${store().home.selectedAddress.selectedDropOff.address}`)
                    .then((res) => {
                        dispatch({
                            type: GET_DISTANCE,
                            payload: res.data
                        })
                    })
                    .catch(err => console.log(err))
                }

                setTimeout(() => {
                    if (store().home.distance.rows ){
                        const calculateFare = fare(
                            variables.baseFare,
                            variables.timeRate,
                            store().home.distance.rows[0].elements[0].duration.value,
                            variables.distanceRate,
                            store().home.distance.rows[0].elements[0].distance.value,
                            variables.surge
                        );
                        dispatch({
                            type: GET_FARE,
                            payload: calculateFare
                        })
                    }
                }, 2000)
            })
            .catch(err => console.log(err.message))
    }
}

export function bookCar(){
    return (dispatch, store) => {
        axios.post('http://localhost:3000/api/bookings', {
            userName: "tushh",
            pickUp: {
                address: store().home.selectedAddress.selectedPickUp.address,
                name: store().home.selectedAddress.selectedPickUp.name,
                latitude: store().home.selectedAddress.selectedPickUp.latitude,
                longitude: store().home.selectedAddress.selectedPickUp.longitude
            },
            dropOff: {
                address: store().home.selectedAddress.selectedDropOff.address,
                name: store().home.selectedAddress.selectedDropOff.name,
                latitude: store().home.selectedAddress.selectedDropOff.latitude,
                longitude: store().home.selectedAddress.selectedDropOff.longitude
            },
            fare: store().home.fare,
            status: "pending"
        })
        .then((res) => {
            dispatch({
                type: BOOK_RIDE,
                payload: res.data
            })
        })
        .catch(err => console.warn(err))
    }
}

//Action Handlers
function handleGetCurrentLocation(state, action){
    return update(state, {
        region: {
            latitude: {
                $set: action.payload.coords.latitude
            },
            longitude: {
                $set: action.payload.coords.longitude,
            },
            latitudeDelta: {
                $set: LATITUDE_DELTA
            },
            longitudeDelta: {
                $set: LONGITUDE_DELTA
            }
        }
    })
}

function handleGetInput(state, action){
    const { key, value } = action.payload
    return update(state, {
        inputData: {
            [key]: {
                $set: value
            }
        }
    })
}

function handleToggleSearch(state, action){
    if (action.payload === "pickup"){
        return update(state, {
            resultTypes: {
                pickup: {
                    $set: true
                },
                dropoff: {
                    $set: false
                }
            },
            predictions: {
                $set: {}
            }
        })
    }
    
    if (action.payload === "dropoff"){
        return update(state, {
            resultTypes: {
                pickup: {
                    $set: false
                },
                dropoff: {
                    $set: true
                }
            },
            predictions: {
                $set: {}
            }
        })
    }
}

function handleGetAddressPredictions(state, action){
    return update(state, {
        predictions: {
            $set: action.payload
        }
    })
}

function handleGetSelectedAddress(state, action){
    let selectedTitle = state.resultTypes.pickup? "selectedPickUp" : "selectedDropOff";

    return update(state, {
        selectedAddress: {
            [selectedTitle]: {
                $set: action.payload
            }
        },
        resultTypes: {
            pickup: {
                $set: false
            },
            dropoff: {
                $set: false
            }
        },
    })
}

function handleGetDistance(state, action){
    return update(state, {
        distance: {
            $set: action.payload
        }
    })
}

function handleGetFare(state, action){
    return update(state, {
        fare: {
            $set: action.payload
        }
    })
}

function handleBookCar(state, action){
    return update(state, {
        booking: {
            $set: action.payload
        }
    })
}

const ACTION_HANDLERS = {
    GET_CURRENT_LOCATION: handleGetCurrentLocation,
    GET_INPUT: handleGetInput,
    TOGGLE_SEARCH_RESULT: handleToggleSearch,
    GET_ADDRESS_PREDICTIONS: handleGetAddressPredictions,
    GET_SELECTED_ADDRESS: handleGetSelectedAddress,
    GET_DISTANCE: handleGetDistance,
    GET_FARE: handleGetFare,
    BOOK_RIDE: handleBookCar
}

const initialState = {
    region: {},
    inputData: {},
    resultTypes: {},
    predictions: {},
    selectedAddress: {},
    distance: {}
};

export function HomeReducer (state = initialState, action){
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state
}