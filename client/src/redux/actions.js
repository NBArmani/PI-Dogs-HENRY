import axios from 'axios'
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



export const getDogs = () => {
    const endpoint = 'http://localhost:3001/dogs';
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint);
           
            dispatch({
                type: GET_DOGS,
                payload: data
            });
        } catch (error) {
            console.log(`No hay datos disponibles debido a esto: ${error.message}`);
        }
    };
};
export const getTemperaments = () => {
    const endpoint = 'http://localhost:3001/temperaments'
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint)
            dispatch({
                type: GET_TEMPERAMENTS,
                payload: data
            })
        } catch (error) {
            console.log(`No hay temperamentos disponibles debido a esto: ${error.message}`)
        }
    }
}

export const getDetail = (id) => {
    const endpoint = `http://localhost:3001/dogs/${id}`
    return async (dispatch) => {
        try {
            const { data } = await axios.get(endpoint)
            dispatch({
                type: GET_DOG_BY_ID,
                payload: data
            })
        } catch (error) {
            console.log('el perro indicado no existe por: ' + error.message)
        }
    }
}

export const getDogsByName = (name) => {
    const endpoint = `http://localhost:3001/dogs/name?q=${name}`;
    return async (dispatch) => {
        try {
            const response = await axios.get(endpoint);
            const data = response.data;

            if (data.length === 0) {
                return { success: false };
            }

            dispatch({
                type: GET_DOG_BY_NAME,
                payload: data
            });

            return { success: true };
        } catch (error) {
            console.log(error.message);
            return { success: false };
        }
    };
};

export const postDog = (payload) => {
    const endpoint = 'http://localhost:3001/dogs';
    return async (dispatch) => {
        try {
           
            const { data } = await axios.post(endpoint, payload);
            dispatch({
                type: POST_DOG,
                payload: data
            });
        } catch (error) {
            console.log(`Error al crear al perro por ${error.message}`);
        }
    }
}
export const filterByTemperament = (temperament) => {
    return {
        type: FILTER_BY_TEMPERAMENT,
        payload: temperament
    }
}

export const filterByOrigin = (origin) => {
    return {
        type: FILTER_BY_ORIGIN,
        payload: origin
    }
}

export const orderByAlphabet = (order) => {
    return {
        type: ORDER_BY_ALPHABET,
        payload: order
    }
}

export const orderByWeight = (order) => {
    return {
        type: ORDER_BY_WEIGHT,
        payload: order
    }
}

export const applyFilters = () => ({
    type: APPLY_FILTERS
})