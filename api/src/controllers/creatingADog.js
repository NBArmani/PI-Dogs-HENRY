const { Dog, Temperament } = require('../db');

const creatingADog = async (name, height, weight, life_span, image, temperaments) => {
    try {
        const [dog, created] = await Dog.findOrCreate({
            where: { name },
            defaults: { height, weight, life_span, image: image || 'https://3fc4ed44-3fbc-419a-97a1-a29742511391.selcdn.net/coub_storage/coub/simple/cw_image/1d5d67e108a/24119f26e828d74bd0d97/1480094298_00064.jpg' }
        });

        if (created) {
            const [temperamentRecords] = await Promise.all(                 // ==> Promise.all se encarga de iterar sobre un arreglo y devuelve una sola promesa cuando todas las promesas del iterable se hayan resuelto o se rechaza cuando una de las promesas no se cumple.
                temperaments.map(async (temp) =>{
                    const [behaviorRecord] = await Temperament.findOrCreate({
                        where: { name: temp }
                    })
                    return behaviorRecord; 
                })
            )
            await dog.setTemperament(temperamentRecords);                  // ==> la diferencia entre addTemperament y setTemperament es que addTemperament agrega un valor a la tabla intermedia, mientras que setTemperament sobreescribe el valor de la tabla intermedia. ambos sirven pero si no quieres mantener asociaciones existentes usa set.
        }

        const temperedDog = await Dog.findByPk(dog.id, {
            include: {
                model: Temperament,
                as: 'temperament',
                through: {
                    attributes: [] // Asegura que no se devuelvan atributos de la tabla intermedia
                }
            }
        })

        return temperedDog;

    } catch (error) {
        throw new Error(`Error al crear el perro: ${error.message}`);
    }
}

module.exports = { creatingADog };

