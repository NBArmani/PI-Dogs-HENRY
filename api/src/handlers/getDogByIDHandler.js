const getDogById = require('../controllers/getDogByID')

const getDogByIdHandler = async (req, res) => {
    const { idRaza } = req.params

    try {

        const dog = await getDogById(idRaza)
        return res.status(200).json(dog)

    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = getDogByIdHandler