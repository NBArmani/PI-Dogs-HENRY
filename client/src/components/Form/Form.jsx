import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTemperaments, postDog } from '../../redux/actions';
import { Link } from 'react-router-dom';

const Form = () => {
    const dispatch = useDispatch()
    const temperaments = useSelector(state => state.temperaments)
    const [formData, setFormData] = useState({
        name: '',
        height: '',
        weight: '',
        life_span: '',
        image: '',
        temperament: []
    })

    const [errors, setErrors] = useState({})

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    const handleChange = (event) => {
        const { name, value, type } = event.target
        if (type === 'select-multiple') {
            const options = event.target.options
            const values = []

            for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                    values.push(options[i].value)
                }
            }

            setFormData({ ...formData, [name]: values })
        } else {
            setFormData({ ...formData, [name]: value })
        }

    }
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(postDog(formData))
        setFormData({
            name: '',
            height: '',
            weight: '',
            life_span: '',
            image: '',
            temperament: []
        })
    }

}

    export default Form