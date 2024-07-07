/*const axios = require('axios')
const { Dog, Temperament } = require("../db")
const dotenv = require('dotenv')
const { Error } = require('sequelize')
dotenv.config()
const { DB_API_KEY } = process.env

const getDogs = async () => {

    try {
        const dataFromDb = await Dog.findAll({ include: Temperament })

        if (dataFromDb.length > 0) {
            const dogDB = dataFromDb.map((dog) => ({
                id: dog.id,
                name: dog.name,
                image: dog.image,
                height: dog.height,
                weight: dog.weight,
                life_span: dog.life_span,
                temperament: dog.temperaments.map((temp) => ({
                    id: temp.id,
                    name: temp.name,
                })),
            }))

            return dogDB
        }


        const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${DB_API_KEY}`)
        const dogs = response.data

        for (const dog of dogs){
            await Dog.findOrCreate({
                where: {
                    id: dog.id
                },
                 defaults: {
                    name: dog.name,
                    image: dog.image.url,
                    height: dog.height.metric,
                    weight: dog.weight.metric,
                    life_span: dog.life_span
                 }
            })
        }

        const dataFromApi = await Dog.findAll({ include: Temperament })

        return [...dataFromDb, ...dataFromApi]

    } catch (error) {
        throw new Error(error)
    }
}


module.exports = getDogs*/


const axios = require('axios');
const { Dog, Temperament } = require("../db");
const dotenv = require('dotenv');
const { Error } = require('sequelize');
dotenv.config();
const { DB_API_KEY } = process.env;

const getDogs = async () => {
    try {
        // Intentamos obtener los datos de la base de datos local
        const dataFromDb = await Dog.findAll({ include: Temperament });

        // Si hay datos en la base de datos local, los retornamos
        if (dataFromDb.length > 0) {
            const dogDB = dataFromDb.map((dog) => ({
                id: dog.id,
                name: dog.name,
                image: dog.image,
                height: dog.height,
                weight: dog.weight,
                life_span: dog.life_span,
                temperaments: dog.Temperaments.map((temp) => ({
                    id: temp.id,
                    name: temp.name,
                })),
            }));
            return dogDB;
        }

        // Si no hay datos en la base de datos local, buscamos en la API externa
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${DB_API_KEY}`);
        const dogs = response.data;

        // Guardamos los perros de la API en la base de datos
        for (const dog of dogs) {
            await Dog.findOrCreate({
                where: { id: dog.id },
                defaults: {
                    name: dog.name,
                    image: dog.image.url,
                    height: dog.height.metric,
                    weight: dog.weight.metric,
                    life_span: dog.life_span,
                }
            });
        }

        // Recuperamos los datos de la base de datos local nuevamente
        const dataFromApi = await Dog.findAll({ include: Temperament });

        // Mapeamos los datos y los retornamos
        const dogData = dataFromApi.map((dog) => ({
            id: dog.id,
            name: dog.name,
            image: dog.image,
            height: dog.height,
            weight: dog.weight,
            life_span: dog.life_span,
            temperaments: dog.Temperaments.map((temp) => ({
                id: temp.id,
                name: temp.name,
            })),
        }));
       
        return dogData;

    } catch (error) {
        console.error(`Error retrieving dogs: ${error.message}`);
        throw new Error(error.message);
    }
};

module.exports = getDogs;