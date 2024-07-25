const { getAllDogs } = require('../controllers/getAllDogs');

const getDogsHandler = async (req, res) => {
    try {
        const dogs = await getAllDogs();
        return res.status(200).json(dogs);
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

module.exports = { getDogsHandler };