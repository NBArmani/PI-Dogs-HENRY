import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../redux/actions';

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const dog = useSelector(state => state.detail);

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);


    return !dog ? <div>Cargando...</div> : (
        <div>
            <h1>{dog.name}</h1>
            <img src={dog.image} alt={dog.name} />
            <h3>Id: {dog.id}</h3>
            <h3>Temperamento: {dog.temperament}</h3>
            <h3>Peso: {dog.weight}</h3>
            <h3>Altura: {dog.height}</h3>
            <h3>Años de vida: {dog.life_span}</h3>
        </div>
    );
};

export default Detail;