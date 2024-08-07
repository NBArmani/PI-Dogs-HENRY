import {
    GET_DOGS,
    GET_TEMPERAMENTS,
    GET_DOG_BY_ID,
    GET_DOG_BY_NAME,
    POST_DOG,
    FILTER_BY_TEMPERAMENT,
    FILTER_BY_ORIGIN,
    ORDER_BY_ALPHABET,
    ORDER_BY_WEIGHT,
    APPLY_FILTERS
} from "./actions-type";

const initialState = {
    dogs: [],
    filteredDogs: [],
    temperaments: [],
    detail: {},
    postDog: [],
    temperamentFilter: null,
    originFilter: null
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
                dogs: [...state.dogs, action.payload],
                filteredDogs: [...state.filteredDogs, action.payload]
            };

        case FILTER_BY_TEMPERAMENT:
            return {
                ...state,
                temperamentFilter: action.payload
            };
        case FILTER_BY_ORIGIN:
            return {
                ...state,
                originFilter: action.payload
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
        
        case APPLY_FILTERS:
            let filteredDogs = state.dogs;

            // Aplica el filtro por temperamento
            if (state.temperamentFilter) {
                filteredDogs = filteredDogs.filter(dog =>
                    dog.temperament && dog.temperament.includes(state.temperamentFilter)
                );
            }

            // Aplica el filtro por origen
            if (state.originFilter) {
                filteredDogs = filteredDogs.filter(dog => {
                    if (state.originFilter === 'all') return true;
                    if (state.originFilter === 'created') return dog.created === true;
                    if (state.originFilter === 'api') return dog.created === false;
                    return false;
                });
            }

            return {
                ...state,
                filteredDogs
            };

        default:
            return state;
    }
};

export default rootReducer;