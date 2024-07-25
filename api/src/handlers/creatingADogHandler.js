const { creatingADog } = require('../controllers/creatingADog');

const creatingADogHandler = async (req, res) => {
    const { name, heightMin, heightMax, weightMin, weightMax, life_span, image, temperament } = req.body;
    console.log(`parámetros recibidos: ${name}, ${heightMin}-${heightMax}, ${weightMin}-${weightMax}, ${life_span}, ${image}, ${temperament}`);
    try {
        if (!heightMin || !heightMax || !weightMin || !weightMax) {
            return res.status(400).send('Height and weight ranges must be provided.');
        }

        // Combine height and weight into single values for the Dog model
        const height = `${heightMin} - ${heightMax}`;
        const weight = `${weightMin} - ${weightMax}`;

        const newDog = await creatingADog(name, height, weight, life_span, image, temperament);
        console.log(`perro devuelto al cliente: ${newDog}`);
        res.status(200).json(newDog);
    } catch (error) {
        console.log(`Error al crear el perro: ${error.message}`);
        return res.status(500).send(error.message);
    }
};

module.exports = { creatingADogHandler };