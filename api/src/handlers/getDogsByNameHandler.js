const getDogsByName = require('../controllers/getDogsByName')

const getDogsByNameHandler = async (req, res) => {
    try {
        const {name} = req.query
        const dogName = await getDogsByName(name)
        return res.status(200).json(dogName)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = getDogsByNameHandler