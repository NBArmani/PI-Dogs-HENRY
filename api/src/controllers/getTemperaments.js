const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config()
const { DB_API_KEY } = process.env
const { Temperament } = require('../db')

const getURL = `https://api.thedogapi.com/v1/breeds?api_key=${DB_API_KEY}`

const getTemperaments = async () => {
    try {
        const { data } = await axios.get(getURL)

        const temperamentsFromApi = data.map(dog => dog.temperament).filter(Boolean) // esto te filtra temperamentos que no están vacíos, no son null ni undefined

        let allTemperaments = temperamentsFromApi.toString().split(',') //lo convierte a string y los divide por comas
        allTemperaments = allTemperaments.map(behavior => behavior.trim()).filter(behavior => behavior !== "") // te dan todos los temperamentos por separado y te saca los espacios vacíos del principio y el final de la cadena

        const tempsFiltrados = [...new Set(allTemperaments)]// con esto nos evitamos valores repetidos.

        if (tempsFiltrados.length === 0) {
            throw new Error('NO SE ENCONTRARON TEMPERAMENTOS')
        }

        const allTemps = tempsFiltrados.map(temp => {  //con esto pasamos los temperamentos a un objeto para luego guardarlo en la base de datos en base al modelo Temperament
            return {
                name: temp
            }
        })

        await Temperament.bulkCreate(allTemps, {ignoreDuplicates: true}) // para evitar duplicados

        return allTemps
    } catch (error) {
        throw new Error(`acá está el error => ${error.message}`)
    }
}

module.exports = { getTemperaments }