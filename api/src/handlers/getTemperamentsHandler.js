const { getTemperaments } = require('../controllers/getTemperaments')

const getTemperamentsHandler = async (req, res) => {
    try {
        const temperaments = await getTemperaments()

        return res.status(200).json(temperaments)
    } catch (error) {
    
        return res.status(500).send(error.message)        
    }
}

module.exports = { getTemperamentsHandler }