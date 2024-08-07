import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postDog } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Validation from './Validation';
import styles from '../../styles/Form.module.css';

const Form = () => {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments) || [];
    const [formData, setFormData] = useState({
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        life_span: '',
        image: '',
        temperament: []
    });

    const [errors, setErrors] = useState({});
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    useEffect(() => {
        if (formData.image) {
            setImageUrl(formData.image);
        } else {
            setImageUrl('');
        }
    }, [formData.image]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        if (type === 'checkbox') {
            setFormData(prevState => {
                if (checked) {
                    return { ...prevState, temperament: [...prevState.temperament, value] };
                } else {
                    return { ...prevState, temperament: prevState.temperament.filter(temp => temp !== value) };
                }
            });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        const validateError = Validation({ ...formData, [name]: value })
        setErrors(validateError)
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const validateErrors = Validation(formData);
        setErrors(validateErrors);

        if (Object.keys(validateErrors).length === 0) {
            const dataToSubmit = {
                ...formData,
                height: `${formData.heightMin} - ${formData.heightMax}`,
                weight: `${formData.weightMin} - ${formData.weightMax}`
            };

            dispatch(postDog(dataToSubmit));

            alert('¡Gracias por dar la información!');

            setFormData({
                name: '',
                heightMin: '',
                heightMax: '',
                weightMin: '',
                weightMax: '',
                life_span: '',
                image: '',
                temperament: []
            });

            setErrors({});
        }
    };

    return (
        <div className={styles.background}>
            <div className={styles.container}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <h1 className={styles.h1}>Dinos, ¿conoces a otro perro que no esté aquí? ¡Completa los campos!</h1>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Pon aquí el nombre de la raza</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={styles.inputCentered}
                        />
                        {errors.name && <span className={styles.errors}>{errors.name}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>¿Cuál es la altura mínima y la altura máxima que puede llegar a tener?</label>
                        <div className={styles.flexRow}>
                            <input
                                type="number"
                                name="heightMin"
                                value={formData.heightMin}
                                onChange={handleChange}
                                min="30"
                                max="100"
                                className={styles.input}
                            />
                            <input
                                type="number"
                                name="heightMax"
                                value={formData.heightMax}
                                onChange={handleChange}
                                min="30"
                                max="100"
                                className={styles.input}
                            />
                        </div>
                        {errors.height && <span className={styles.errors}>{errors.height}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>¿Cuál es el peso mínimo y el peso máximo que puede llegar a tener?</label>
                        <div className={styles.flexRow}>
                            <input
                                type="number"
                                name="weightMin"
                                value={formData.weightMin}
                                onChange={handleChange}
                                min="1"
                                max="100"
                                className={styles.input}
                            />
                            <input
                                type="number"
                                name="weightMax"
                                value={formData.weightMax}
                                onChange={handleChange}
                                min="1"
                                max="100"
                                className={styles.input}
                            />
                        </div>
                        {errors.weight && <span className={styles.errors}>{errors.weight}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>¿Más o menos cuánto vive el perro?</label>
                        <input
                            type="text"
                            name="life_span"
                            value={formData.life_span}
                            onChange={handleChange}
                            className={styles.inputCentered}
                        />
                        {errors.life_span && <span className={styles.errors}>{errors.life_span}</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>¡Muéstrame una foto bonita de tu perro!</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className={styles.inputCentered}
                        />
                        {imageUrl && (
                            <div className={styles.imagePreview}>
                                <img src={imageUrl} alt="Preview" />
                            </div>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Selecciona uno o más temperamentos que tenga:</label>
                        <div className={styles.checkboxGrid}>
                            {temperaments.map((temperament, index) => (
                                <label key={temperament.id || index} className={styles.checkboxItem}>
                                    <input
                                        className={styles.temperamentInput}
                                        type="checkbox"
                                        name="temperament"
                                        value={temperament.name}
                                        checked={formData.temperament.includes(temperament.name)}
                                        onChange={handleChange}
                                    />
                                    {temperament.name}
                                </label>
                            ))}
                        </div>
                        {errors.temperament && <span className={styles.errors}>{errors.temperament}</span>}
                    </div>

                    <button type="submit" className={styles.submitButton}>¡Gracias por la información!</button>
                </form>

                <Link to="/home" className={styles.link}>Volver</Link>
            </div>
        </div>
    );
};

export default Form;