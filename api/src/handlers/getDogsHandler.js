const  getDogs  = require('../controllers/getDogs')

const getDogsHandler = async (req, res) => {
    try {
        const dogs = await getDogs()
        return res.status(200).send(dogs)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = getDogsHandler