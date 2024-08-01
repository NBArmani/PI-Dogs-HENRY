const axios = require('axios');
const { Dog, Temperament } = require('../db');
const dotenv = require('dotenv');
dotenv.config();
const { DB_API_KEY } = process.env;

const getURL = `https://api.thedogapi.com/v1/breeds?api_key=${DB_API_KEY}`;

const getAllDogs = async () => {
    try {
        
        let dogDB = await Dog.findAll({
            include: {
                model: Temperament,
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

        const mappedDataFromApi = data.map(dog => {
            return {
                id: dog.id,
                name: dog.name,
                height: dog.height.metric,
                weight: dog.weight.metric,
                life_span: dog.life_span,
                temperament: dog.temperament,
                image: dog.image.url,
                created: false
            };
        });

       

        return [...mappedDataFromDb, ...mappedDataFromApi];

    } catch (error) {
        throw new Error(`Fíjate que el error es el siguiente: ${error.message}`);
    }
};

module.exports = { getAllDogs };