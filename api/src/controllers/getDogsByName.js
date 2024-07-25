const { getAllDogs } = require('./getAllDogs');

const getDogsByName = async (nombreRaza) => {
    try {
        const allDoggos = await getAllDogs();
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