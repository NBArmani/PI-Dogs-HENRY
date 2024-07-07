const { Sequelize } = require('sequelize')
const { Dog } = require('../db')
const { Op } = Sequelize

const getDogsByName = async (name) => {
    try {
        const response = await Dog.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        })

        return response
    } catch (error) {
        throw new Error (error.message)
    }
}

module.exports = getDogsByName