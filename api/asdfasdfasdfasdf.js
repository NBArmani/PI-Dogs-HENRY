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

________________________________________________________________________________________
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

____________________________________________________________________________________
const axios = require('axios');
const { Dog, Temperament } = require("../db");
const dotenv = require('dotenv');
const { Error } = require('sequelize');

dotenv.config();
const { DB_API_KEY } = process.env;
const getURL = `https://api.thedogapi.com/v1/breeds?api_key=${DB_API_KEY}`;

const getDogs = async () => {
    try {
        ! Obtener datos de la API
        const { data: dataFromApi } = await axios.get(getURL);

        ! Mapeo de datos de la API
        const dataFromApiMapped = dataFromApi.map((dog) => {
            const imageURL = `https://api.thedogapi.com/v1/images/${dog.reference_image_id}.jpg`;

            return {
                id: dog.id,
                name: dog.name,
                image: imageURL,  // Usar imageURL en lugar de dog.image.url
                height: dog.height?.metric,
                weight: dog.weight?.metric,
                life_span: dog.life_span,
                temperament: dog.temperament,
                created: false
            };
        });

        ! Obtener datos de la base de datos
        const dogDB = await Dog.findAll({
            include: {
                model: Temperament,
                as: 'temperament'
            }
        });

        ! Verificar si hay datos en la base de datos
        if (!dogDB || dogDB.length === 0) {
            throw new Error('No hay perros en la base de datos');
        }

        ! Mapeo de datos de la base de datos
        const dataFromDbMapped = dogDB.map((dog) => {
            const dogBehavior = dog.temperament.map(temp => temp.name);

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

        ! Combinar datos de la API y de la base de datos
        const combinedData = [...dataFromDbMapped, ...dataFromApiMapped];

        return combinedData;
    } catch (error) {
        throw new Error(`Error al obtener datos de perros: ${error.message}`);
    }
};

module.exports = getDogs;


________________________________________________________________________________________

const axios = require('axios');
const { Dogs } = require('../db');
const dotenv = require('dotenv');
dotenv.config();
const { API_KEY } = process.env;

const getDogByName = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'digita un criterio de busqueda' });
    }

    todo obtengo los resultados de la base de datos

    const dbResult = await Dogs.findAll();

  todo obtengo resultados de la api

    const responseApi = await axios.get(
      http://api.thedogapi.com/v1/breeds?API_KEY=${API_KEY}
    );

    const apiResult = responseApi.data;

    todo combinamos los resultados

    const allResults = [...dbResult, ...apiResult];

    todo filtramos los resultados basados con la busqueda

    const filteredResults = allResults.filter((dog) =>
      dog.name.toLowerCase().includes(q.toLowerCase())
    );

    if (filteredResults.length > 0) {
      return res.status(200).json(filteredResults);
    } else {
      return res.status(404).json({
        message: 'no se encontraron perror con el nombre ingresado',
      });
    }
  } catch (error) {
    console.error('Error al realizar la busqueda', error);
    res.status(500).json({ error: 'internal server error' });
  }
};

module.exports = getDogByName;
________________________________________________________________________________________
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const { DB_API_KEY } = process.env;
const { validate: isUUID } = require('uuid');
const { Dog, Temperament } = require('../db');

const getDogById = async (id) => {
    try {
        let dogDetail;

        if (isUUID(id)) {
            const dog = await Dog.findByPk(id, {
                include: {
                    model: Temperament,
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            });

            if (dog) {
                const dogInfo = dog.toJSON();
                dogInfo.temperament = dog.temperaments.map(temp => temp.name);
                dogDetail = dogInfo;
            } else {
                throw new Error('No se ha podido encontrar el perro con el ID especificado en la base de datos');
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
        console.log(`El error es el siguiente: ${error.message}`);
        throw new Error(error.message);
    }
};

module.exports = { getDogById };


__________________________________________________________________________________________________________
const axios = require('axios');
const dotenv = require('dotenv');
const { Dog, Temperament } = require('../db');
dotenv.config();
const { DB_API_KEY } = process.env;

const getDogsByName = async (nombreRaza) => {
    try {
        const dogsFromDb = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: ['name'],
                through: { attributes: [] }
            }
        });
        
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${DB_API_KEY}`);
        const dogsFromApi = response.data;
        
        const allDoggos = [
            ...dogsFromDb.map(dog => ({
                id: dog.id,
                name: dog.name,
                image: dog.image,
                height: dog.height,
                weight: dog.weight,
                life_span: dog.life_span,
                temperament: dog.temperaments.map(temp => temp.name).join(', '),
                created: true
            })),
            ...dogsFromApi.map(dog => ({
                id: dog.id,
                name: dog.name,
                image: `https://api.thedogapi.com/v1/images/${dog.reference_image_id}.jpg`,
                height: dog.height.metric,
                weight: dog.weight.metric,
                life_span: dog.life_span,
                temperament: dog.temperament,
                created: false
            }))
        ];

        const dogName = allDoggos.filter(dog => dog.name.toLowerCase().includes(nombreRaza.toLowerCase()));

        if (dogName.length === 0) {
            throw new Error(`El perro ${nombreRaza} no existe`);
        }

        return dogName;
    } catch (error) {
        throw new Error(`Fíjate que este es el error: ${error.message}`);
    }
};

module.exports = { getDogsByName };



*/