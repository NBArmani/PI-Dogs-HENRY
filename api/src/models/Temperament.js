const { DataTypes, Sequelize } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('temperament', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull:false,
            defaultValue: Sequelize.literal('uuid_generate_v4()')
          },

        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timestamps: false })
}