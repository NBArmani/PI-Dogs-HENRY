const getDogById = require('../controllers/getDogByID')

const getDogByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const dog = await getDogById(id);

        if (dog) {
            return res.status(200).json(dog);
        } else {
            return res.status(404).json({ message: 'Dog not found' });
        }

    } catch (error) {
        console.error('Error fetching dog by ID:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = getDogByIdHandler