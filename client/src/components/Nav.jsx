import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterByOrigin, filterByTemperament, orderByAlphabet, orderByWeight, getDogs, getTemperaments } from '../redux/actions';
import SearchBar from './SearchBar';

const Nav = () => {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]);

    const [originFilter, setOriginFilter] = useState('all');
    const [temperamentFilter, setTemperamentFilter] = useState('');
    const [alphabetOrder, setAlphabetOrder] = useState('asc');
    const [weightOrder, setWeightOrder] = useState('asc');

    const handleOriginChange = (event) => {
        const value = event.target.value;
        setOriginFilter(value);
    };

    const handleTemperamentChange = (event) => {
        const value = event.target.value;
        setTemperamentFilter(value);
    };

    const handleAlphabetOrderChange = (event) => {
        const value = event.target.value;
        setAlphabetOrder(value);
    };

    const handleWeightOrderChange = (event) => {
        const value = event.target.value;
        setWeightOrder(value);
    };

    const handleApplyFilters = () => {
        dispatch(filterByOrigin(originFilter));
        dispatch(filterByTemperament(temperamentFilter));
    };

    const handleApplyOrder = () => {
        dispatch(orderByAlphabet(alphabetOrder));
        dispatch(orderByWeight(weightOrder));
    };

    return (
        <nav>
            <div>
                <SearchBar />
            </div>
            <Link to='/form'> ¿Conoces otro perro?</Link>
            <select value={originFilter} onChange={handleOriginChange}>
                <option value="all">Todos</option>
                <option value="created">Creados</option>
                <option value="api">Existentes</option>
            </select>

            <select value={temperamentFilter} onChange={handleTemperamentChange}>
                <option value="">Selecciona el temperamento</option>
                {temperaments.map(temp => (
                    <option key={temp.id || temp.name} value={temp.name}>{temp.name}</option>
                ))}
            </select>
            <button onClick={handleApplyFilters}>Filtrar</button>

            <select value={alphabetOrder} onChange={handleAlphabetOrderChange}>
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
            </select>

            <select value={weightOrder} onChange={handleWeightOrderChange}>
                <option value="asc">Menor peso</option>
                <option value="desc">Mayor peso</option>
            </select>

            <button onClick={handleApplyOrder}>Ordenar</button>
        </nav>
    );
};

export default Nav;
