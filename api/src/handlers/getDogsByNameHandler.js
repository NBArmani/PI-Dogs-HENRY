const { getDogsByName } = require('../controllers/getDogsByName');

const getDogsByNameHandler = async (req, res) => {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).send('Por favor indique el nombre del perro que desea buscar');
        }

        const dogName = await getDogsByName(q);

        if (dogName.length === 0) {
            return res.status(404).send(`No se encontraron perros cuyo nombre es ${q}`);
        }

        return res.status(200).json(dogName);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = { getDogsByNameHandler };