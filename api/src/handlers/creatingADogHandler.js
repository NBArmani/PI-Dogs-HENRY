const { creatingADog } = require('../controllers/creatingADog')

const creatingADogHandler = async (req, res) => {

    const { name, height, weight, life_span, image, temperament } = req.body;

    try {
        const newDog = await creatingADog(name, height, weight, life_span, image, temperament);

        res.status(200).json(newDog)
    } catch (error) {
        return res.status(500).send(error.message)
    }

}

module.exports = { creatingADogHandler }