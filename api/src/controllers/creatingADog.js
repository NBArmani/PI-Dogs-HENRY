const { Dog, Temperament } = require('../db');

const creatingADog = async (name, height, weight, life_span, image, temperaments) => {
    try {
                
        if (!name || !height || !weight || !life_span) {
            throw new Error('Faltan datos requeridos para crear el perro.');
        }

        height = height || 'Unknown';
        weight = weight || 'Unknown';
              
        const [dog, created] = await Dog.findOrCreate({
            where: { name },
            defaults: { height, weight, life_span, image: image || 'https://3fc4ed44-3fbc-419a-97a1-a29742511391.selcdn.net/coub_storage/coub/simple/cw_image/1d5d67e108a/24119f26e828d74bd0d97/1480094298_00064.jpg', created: true }
        });
       
       
        if (created) {
            const temperamentRecords = await Promise.all(
                temperaments.map(async (temp) => {
                    const [behaviorRecord] = await Temperament.findOrCreate({
                        where: { name: temp }
                    });
                    return behaviorRecord;
                })
            );
            await dog.addTemperaments(temperamentRecords);
        }

        const temperedDog = await Dog.findByPk(dog.id, {
            include: {
                model: Temperament,
                as: 'temperaments',
                through: {
                    attributes: [] 
                }
            }
        });
        return temperedDog;

    } catch (error) {
        throw new Error(`Error al crear el perro: ${error.message}`);
    }
}

module.exports = { creatingADog };