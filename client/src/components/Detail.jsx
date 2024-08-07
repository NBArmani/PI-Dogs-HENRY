import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';  
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../redux/actions';
import { Link } from 'react-router-dom';
import styles from '../styles/Detail.module.css'; 

const Detail = () => {
    const { id } = useParams();                    
    const dispatch = useDispatch();                 
    const dog = useSelector(state => state.detail); 

    useEffect(() => {                               
        dispatch(getDetail(id));
    }, [dispatch, id]);

   
    return !dog ? <div>Cargando...</div> : (        
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.leftSection}>
                    <h1 className={styles.h1}><strong>{dog.name}</strong></h1>
                    <img src={dog.image} alt={dog.name} />
                </div>
                <div className={styles.rightSection}>
                    <h3>id: {dog.id}</h3>
                    <h3>Temperamento: {dog.temperament}</h3>
                    <h3>Peso: {dog.weight}</h3>
                    <h3>Altura: {dog.height}</h3>
                    <h3>Años de vida: {dog.life_span}</h3>
                </div>
            </div>
            <Link to='/home'> <button className={styles.button}>🡸 Volver</button></Link>
        </div>
    );
};

export default Detail;