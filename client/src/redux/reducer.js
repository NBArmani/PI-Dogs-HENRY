import {
    GET_DOGS,
    GET_TEMPERAMENTS,
    GET_DOG_BY_ID,
    GET_DOG_BY_NAME,
    POST_DOG,
    FILTER_BY_TEMPERAMENT,
    FILTER_BY_ORIGIN,
    ORDER_BY_ALPHABET,
    ORDER_BY_WEIGHT
} from "./actions-type";
const initialState = {
    dogs: [],
    filteredDogs: [],
    temperaments: [],
    detail: {},
    postDog: []
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                filteredDogs: action.payload
            };
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            };
        case GET_DOG_BY_ID:
            return {
                ...state,
                detail: action.payload
            };
        case GET_DOG_BY_NAME:
            return {
                ...state,
                filteredDogs: action.payload
            };
        case POST_DOG:
            return {
                ...state,
                postDog: action.payload
            };
        case FILTER_BY_TEMPERAMENT:
            const filteredByTemperament = state.dogs.filter(dog =>
                dog.temperament && dog.temperament.includes(action.payload)
            );
            return {
                ...state,
                filteredDogs: filteredByTemperament
            };
        case FILTER_BY_ORIGIN:
            const filteredByOrigin = action.payload === 'all'
                ? state.dogs
                : state.dogs.filter(dog => dog.created === (action.payload === 'database'));
            return {
                ...state,
                filteredDogs: filteredByOrigin
            };
        case ORDER_BY_ALPHABET:
            const sortedByAlphabet = [...state.filteredDogs].sort((a, b) => {
                if (action.payload === 'asc') {
                    return a.name.localeCompare(b.name);
                }
                return b.name.localeCompare(a.name);
            });
            return {
                ...state,
                filteredDogs: sortedByAlphabet
            };
        case ORDER_BY_WEIGHT:
            const sortedByWeight = [...state.filteredDogs].sort((a, b) => {
                if (action.payload === 'asc') {
                    return parseFloat(a.weight) - parseFloat(b.weight);
                }
                return parseFloat(b.weight) - parseFloat(a.weight);
            });
            return {
                ...state,
                filteredDogs: sortedByWeight
            };
        default:
            return state;
    }
};

export default rootReducer;