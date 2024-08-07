import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';              
import { filterByOrigin, filterByTemperament, orderByAlphabet, orderByWeight, getDogs, getTemperaments, applyFilters } from '../redux/actions';
import SearchBar from './SearchBar';                                 
import styles from '../styles/Nav.module.css';

const Nav = () => {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);

    const [originFilter, setOriginFilter] = useState('all');
    const [temperamentFilter, setTemperamentFilter] = useState('');
    const [alphabetOrder, setAlphabetOrder] = useState('asc');
    const [weightOrder, setWeightOrder] = useState('asc');


    useEffect(() => {                                               
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]);

    useEffect(() => {                                                
        dispatch(applyFilters());
    }, [dispatch, originFilter, temperamentFilter]);

    const handleOriginChange = (event) => {                         
        const value = event.target.value;
        setOriginFilter(value);
        dispatch(filterByOrigin(value));
    };

    const handleTemperamentChange = (event) => {                    
        const value = event.target.value;
        setTemperamentFilter(value);
        dispatch(filterByTemperament(value));
    };

    const handleAlphabetOrderChange = (event) => {                  
        const value = event.target.value;
        setAlphabetOrder(value);
        dispatch(orderByAlphabet(value));
    };

    const handleWeightOrderChange = (event) => {                    
        const value = event.target.value;
        setWeightOrder(value);
        dispatch(orderByWeight(value));
    };

    const handleResetAll = () => {
        setOriginFilter('all');
        setTemperamentFilter('');
        setAlphabetOrder('asc');
        setWeightOrder('asc');

        dispatch(applyFilters());
        dispatch(orderByAlphabet('asc'));
        dispatch(orderByWeight('asc'));
        dispatch(getDogs());
    }
    return (
        <nav className={styles.container}>
            <div className={styles.topSection}>
                <h1>Esto es Henry Dogs</h1>
                <SearchBar />
                <button className={styles.reset_button} onClick={handleResetAll}>Resetear filtros</button>                                   
            </div>
            <div className={styles.filtersSection}>
                <select value={originFilter} onChange={handleOriginChange}>
                    <option value="all">Todos</option>
                    <option value="created">Creados</option>
                    <option value="api">Existentes</option>
                </select>

                <select value={temperamentFilter} onChange={handleTemperamentChange}>
                    <option value="">Selecciona el temperamento</option>
                    {temperaments.map(temp => (                     
                        <option                                    
                            value={temp.name}>
                            {temp.name}
                        </option>                                   
                    ))}
                </select>

                <select value={alphabetOrder} onChange={handleAlphabetOrderChange}>
                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>

                <select value={weightOrder} onChange={handleWeightOrderChange}>
                    <option value="asc">Menor peso</option>
                    <option value="desc">Mayor peso</option>
                </select>
            </div>
            <Link to="/conoces-otro-perro"><button className={styles.button}>¿Conoces otro perro?</button></Link>
        </nav>
    );
};

export default Nav;