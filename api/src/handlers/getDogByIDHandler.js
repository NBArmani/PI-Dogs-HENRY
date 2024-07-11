const { getDogById } = require('../controllers/getDogByID');

const getDogByIdHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const dog = await getDogById(id);

        return res.status(200).json(dog);
        
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getDogByIdHandler };
