const { Dog, Temperament } = require('../db')

const creatingADog = async (name, height, weight, life_span, image, temperament) => {

    try {
        const [dog, created] = await Dog.findOrCreate({
            where: { name },
            defaults: { height, weight, life_span, image },
            include: {
                model: Temperament,
                as: 'temperament',
                through: {
                    attributes: []
                }

            }
        })
        if (created) {
            const temperaments = await Temperament.findAll({
                where: { name: temperament }
            });
            await dog.addTemperaments(temperaments);
        }
        return dog

    } catch (error) {
        throw new Error(`Error al crear el perro: ${error.message}`)
    }

}

module.exports = { creatingADog }