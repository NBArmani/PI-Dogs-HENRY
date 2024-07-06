const axios = require('axios')
const { Dog, Temperament } = require("../db")
const dotenv = require('dotenv')
const { Error } = require('sequelize')
dotenv.config()
const { DB_API_KEY } = process.env

const getDogs = async () => {

    try {
        const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${DB_API_KEY}`)
        const dogs = response.data


        for (let dogData of dogs) {
            const imageURL = `https://cdn2.thedogapi.com/images/${dogData.reference_image_id}.jpg`

            const [dog, created] = await Dog.findOrCreate({
                where: { id: dogData.id },
                defaults: {
                    name: dogData.name,
                    image: imageURL,
                    height: dogData.height.metric,
                    weight: dogData.weight.metric,
                    life_span: dogData.life_span,
                }
            })

            if (created) {
                if (dogData.temperament) {
                    const temperamentsArray = dogData.temperament.split(', ')
    
                    for (let temperament of temperamentsArray) {
                        let [temp, tempCreated] = await Temperament.findOrCreate({
                            where: { name: temperament }
                        })
                        await dog.addTemperament(temp)
                    }
                }
            }
        }
        const updatedDogs = await Dog.findAll({ include: Temperament })
        return updatedDogs

    } catch (error) {
        throw new Error(error)
    }
}


module.exports = getDogs