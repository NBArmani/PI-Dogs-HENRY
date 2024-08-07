const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()
const { DB_API_KEY } = process.env
const { Temperament } = require('../db')

const getURL = `https://api.thedogapi.com/v1/breeds?api_key=${DB_API_KEY}`

const getTemperaments = async () => {
    try {
        const { data } = await axios.get(getURL)

        const temperamentsFromApi = data.map(dog => dog.temperament).filter(Boolean)

        let allTemperaments = temperamentsFromApi.toString().split(',') 
        allTemperaments = allTemperaments.map(behavior => behavior.trim()).filter(behavior => behavior !== "") 

        const tempsFiltrados = [...new Set(allTemperaments)]

        if (tempsFiltrados.length === 0) {
            throw new Error('NO SE ENCONTRARON TEMPERAMENTOS')
        }

        const allTemps = tempsFiltrados.map(temp => { 
            return {
                name: temp
            }
        })

        await Temperament.bulkCreate(allTemps, {ignoreDuplicates: true}) 

        return allTemps
    } catch (error) {
        throw new Error(`acá está el error => ${error.message}`)
    }
}

module.exports = { getTemperaments }