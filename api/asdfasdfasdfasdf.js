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

_________________________________________________________________________________

const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const { API_KEY } = process.env;
const { Dogs, Temperaments } = require('../db');
const getDogs = async (req, res) => {
  try {
    const dbData = await Dogs.findAll({
      include: {
        model: Temperaments,
        attributes: ['name'],
        through: {
          attributes: [],
        },
      },
    });

    if (dbData.length > 0) {
      const dogData = dbData.map((dog) => ({
        id: dog.id,
        name: dog.name,
        height: dog.height,
        weight: dog.weight,
        life_span: dog.life_span,
        temperaments: dog.temperaments.map((temp) => ({
          id: temp.id,
          name: temp.name,
        })),
      }));
      return res.status(200).json(dogData);
    }

    const response = await axios.get(
      http://api.thedogapi.com/v1/breeds?API_KEY=${API_KEY}
    );

    const apiData = response.data;

________________________________________________________________________________________
//? para buscar por id:

const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const { API_KEY } = process.env;
const { validate: isUUID } = require('uuid');
const { Dog, Temperament } = require('../db');

const getDogById = async (req, res) => {
  const { id } = req.params;

  try {
    let dogInfo;

    if (isUUID(id)) {
      const dbInfo = await Dog.findByPk(id, { include: Temperament });

      if (dbInfo) {
        const dogDetail = dbInfo.toJSON();

        dogDetail.temperament = dbInfo.Temperament.map((temp) => ({
          id: temp.id,
          name: temp.name,
        }));

        dogInfo = dogDetail;
        return res.status(200).json(dogInfo);
      } else {
        return res
          .status(404)
          .json({ error: 'Perro no encontrado en la base de datos' });
      }
    } else {
      const responseApi = await axios.get(
        http://api.thedogapi.com/v1/breeds/${id}?API_KEY=${API_KEY}
      );

      const apiData = responseApi.data;

      dogInfo = {
        id: apiData.id,
        reference_image_id: apiData.reference_image_id,
        name: apiData.name,
        height: apiData.height,
        weigth: apiData.weight,
        life_span: apiData.life_span,
      };

      res.status(200).json(dogInfo);
    }
  } catch (error) {
    console.error('Error al obtener detalles del perro', error);
    res.status(500).json({ error: 'Error al obtener los detalles del perro' });
  }
};

module.exports = getDogById;

___________________________________________________________________________________________

 


//? mi anterior función:

    try {

        let dogDetail;

        if (isUUID(id)) {
            const dog = await Dog.findByPk(id, {
                include: Temperament
            })

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
            const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?API_KEY=${DB_API_KEY}`)
            const allDogs = response.data
            dogDetail = {
                id: allDogs.id,
                reference_image_id: allDogs.reference_image_id,
                name: allDogs.name,
                height: allDogs.height.metric,
                weight: allDogs.weight.metric,
                life_span: allDogs.life_span,
                
        }

        return dogDetail
    }




        
       /* const apiDog = allDogs.filter(d => d.id === parseInt(id))[0]

        if (!dog && !apiDog) {
            throw new Error('No se encontró el perro con el ID especificado');
        }


        if (apiDog) {
            console.log('El perro de la api es : ', apiDog)

            return {
                id: apiDog.id,
                name: apiDog.name,
                image: apiDog.image ? apiDog.image.url : null,
                height: apiDog.height.metric,
                weight: apiDog.weight.metric,
                life_span: apiDog.life_span,
                temperament: apiDog.temperament ? apiDog.temperament.split(', ') : []
            }
        }
        } catch (error) {
            console.log(`el error es el siguiente: ${error}`)
            throw new Error(error.message)
        }
    }
_________________________________________________________________________________________

// controllers/dogController.js

const axios = require('axios');
const { Dog, Temperament } = require('../models'); // Asegúrate de tener estos modelos definidos
const { DB_API_KEY } = process.env;

const getDogDetail = async (idRaza) => {
  // Primero buscamos en la base de datos local
  let dog = await Dog.findOne({
    where: { id: idRaza },
    include: {
      model: Temperament,
      attributes: ['name'],
      through: {
        attributes: [],
      },
    },
  });

  if (dog) {
    // Si encontramos el perro en la base de datos local, devolvemos esa información
    return {
      id: dog.id,
      name: dog.name,
      temperaments: dog.Temperaments.map(temp => temp.name),
      // Añadir más campos según tu modelo
    };
  }

  // Si no está en la base de datos local, buscamos en la API externa
  const apiUrl = `https://api.thedogapi.com/v1/breeds/${idRaza}?API_KEY=${DB_API_KEY}`;
  const response = await axios.get(apiUrl);

  if (response.data) {
    // Mapeamos la información de la API externa al formato que queremos devolver
    dog = {
      id: response.data.id,
      name: response.data.name,
      temperaments: response.data.temperament ? response.data.temperament.split(', ') : [],
      // Añadir más campos según la respuesta de la API
    };

    return dog;
  }

  return null; // Si no se encontró en ninguno de los dos lugares
};

module.exports = {
  getDogDetail,
};


id: response.id,
        name: response.name,
        image: response.image ? response.image.url : null,
        height: response.height.metric,
        weight: response.weight.metric,
        life_span: response.life_span,
        temperament: response.temperament ? response.temperament.split(', ') : [], 


*/