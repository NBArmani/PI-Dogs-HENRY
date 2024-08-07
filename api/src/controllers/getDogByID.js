const { getAllDogs } = require('./getAllDogs');

const getDogById = async (id) => {
    try {
        const allDogies = await getAllDogs();
        let findDogByID;

        if (id.includes('-')) {                                                 
            findDogByID = allDogies.find((dog) => dog.id === id);               
        } else {
            findDogByID = allDogies.find((dog) => dog.id === parseInt(id, 10)); 
        }

        if (!findDogByID) {
            throw new Error(`El perro de ID ${id} no existe.`);
        }

        return findDogByID;
    } catch (error) {
        throw new Error(`¡Tengo un error! es el siguiente: ${error.message}`);
    }
}

module.exports = { getDogById };