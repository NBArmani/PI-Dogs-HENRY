import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogsByName } from '../redux/actions';
import styles from '../styles/Nav.module.css';
const SearchBar = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');

    const handleSearch = async () => {
        if (query.trim() === ''){
            setError('') // -----> con esto nos aseguramos de que se limpie el error cuando el imput está vacío
            return
        }
            const result = await dispatch(getDogsByName(query));
        if (result.success) {
            setQuery('');
            setError('');
        } else {
            setError('¡Lo siento, no se encontraron perros con ese nombre!');
        }
    };


    const handleChange = (event) => {
        const value = event.target.value;
        setQuery(value);

        //con esto nos aseguramos de que se limpie el error cuando el imput cambia
        if(value.trim() === '') {
            setError('')
        }

    };


    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch();
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.searchForm}>
                <input
                    className={styles.searchBar}
                    type="search"
                    value={query}
                    onChange={handleChange}
                    placeholder="Busca tu perro favorito aquí"
                />
                <button type="submit" className={styles.button} >Buscar</button>
            </form>
            {error && <p className={styles.searchbar_error}>{error}</p>}
        </div>
    );
};



export default SearchBar;