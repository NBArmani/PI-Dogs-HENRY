const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const { DB_API_KEY } = process.env;
const { validate: isUUID } = require('uuid');
const { Dog, Temperament } = require('../db');

const getDogById = async (id) => {
    try {

        let dogDetail;

        if(isUUID(id)) {
            const dog = await Dog.findByPk(id, {
                include: {
                    model: Temperament,
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            });
        

            if (dog) {
                const dogInfo = dog.toJSON()
                dogInfo.temperament = dog.Temperament.map((temp) => ({
                    id: temp.id,
                    name: temp.name
                }))
                dogDetail = dogInfo
                return dogDetail
            } else {
                throw new Error('No se ha podido encontrar el perro con el ID especificado');
            }

        } else {            
            const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${DB_API_KEY}`);
            const dogFromApi = response.data;

            if (dogFromApi) {
                dogDetail = {
                    id: dogFromApi.id,
                    reference_image_id: dogFromApi.reference_image_id,
                    name: dogFromApi.name,
                    height: dogFromApi.height.metric,
                    weight: dogFromApi.weight.metric,
                    life_span: dogFromApi.life_span,
                    temperament: dogFromApi.temperament ? dogFromApi.temperament.split(', ') : []
                };
            } else {
                throw new Error('No se ha podido encontrar el perro con el ID especificado en la API');
            }
        }

        return dogDetail;
    } catch (error) {
        console.log(`el error es el siguiente: ${error}`)
        throw new Error(error.message)
    }
};

module.exports = getDogById;
