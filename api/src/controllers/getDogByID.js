const { Dog, Temperament } = require('../db')

const getDogById = async (id) => {
    try {
        const dog = await Dog.findByPk(id, {
            include: Temperament
        })

        if (dog) {
            return dog
        }

        const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${id}?api_key=${DB_API_KEY}`)
        const allDogs = response.data

        const apiDog = allDogs.find(d => d.id === parseInt(id))

        if (apiDog) {
            return {
                id: apiDog.id,
                name: apiDog.name,
                image: apiDog.image,
                height: apiDog.height.metric,
                weight: apiDog.weight.metric,
                life_span: apiDog.life_span,
            }
        }

        throw new error('El perro buscado no está aquí')
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = getDogById