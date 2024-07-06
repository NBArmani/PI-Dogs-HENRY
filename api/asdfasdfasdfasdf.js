/*const { Dog, Temperament } = require('../db');
const axios = require('axios');

const getDogById = async (id) => {
    try {
        // Buscar el perro en la base de datos
        const dog = await Dog.findByPk(id, {
            include: Temperament
        });

        if (dog) {
            return dog;
        }

        // Si no se encuentra en la base de datos, buscar en la API externa
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds`);
        const allDogs = response.data;

        const apiDog = allDogs.find(d => d.id === parseInt(id));

        if (apiDog) {
            // Formatear el objeto para que coincida con la estructura esperada
            return {
                id: apiDog.id,
                name: apiDog.name,
                temperament: apiDog.temperament ? apiDog.temperament.split(', ') : [],
                // Agregar otros campos necesarios
            };
        }

        throw new Error('El perro no está aquí');
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = getDogById;

*/