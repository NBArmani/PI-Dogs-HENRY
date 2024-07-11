const axios = require('axios');
const { Dog, Temperament } = require('../db');
const dotenv = require('dotenv');
const { Error } = require('sequelize');
dotenv.config();
const { DB_API_KEY } = process.env;

const getURL = `https://api.thedogapi.com/v1/breeds?api_key=${DB_API_KEY}`;

const getAllDogs = async () => {
    try {
        // Obtener datos de la base de datos
        let dogDB = await Dog.findAll({
            include: {
                model: Temperament,
                as: 'temperament',
                attributes: ['name'], 
                through: {
                    attributes: [] 
                }
            }
        });

        
        if (!dogDB || dogDB.length === 0) {
            dogDB = [];
        }

        
        const mappedDataFromDb = dogDB.map(dog => {
            const dogBehavior = dog.temperaments.map(temp => temp.name);
            return {
                id: dog.id,
                name: dog.name,
                image: dog.image,
                height: dog.height,
                weight: dog.weight,
                life_span: dog.life_span,
                temperament: dogBehavior.join(', '),
                created: true
            };
        });

        
        const { data } = await axios.get(getURL);

        
        if (!data || data.length === 0) {
            throw new Error('No hay perros en esta perrera');
        }

        
        const mappedDataFromApi = data.map(dog => {
            const imageURL = `https://api.thedogapi.com/v1/images/${dog.reference_image_id}.jpg`;
            return {
                id: dog.id,
                name: dog.name,
                height: dog.height.metric,
                weight: dog.weight.metric,
                life_span: dog.life_span,
                temperament: dog.temperament,
                image: imageURL,
                created: false
            };
        });

        return [...mappedDataFromDb, ...mappedDataFromApi];

    } catch (error) {
        throw new Error(`Fíjate que el error es el siguiente: ${error.message}`);
    }
};

module.exports = { getAllDogs };

