import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogsByName } from '../redux/actions';
import styles from '../styles/Nav.module.css';
const SearchBar = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            await dispatch(getDogsByName(query));
            setQuery(''); // Limpiar el campo de búsqueda después de la búsqueda exitosa
            setError(''); // Limpiar cualquier error anterior
        } catch (error) {
            setError('No se encontraron perros con ese nombre.');
        }
    };

    const handleChange = (event) => {
        setQuery(event.target.value);
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
            {error && <p>{error}</p>}
        </div>
    );
};

export default SearchBar;