const {DataTypes} = require("sequelize")


module.exports = (database)=>{
    database.define(
        'Favorite',
        {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true
            },
            name:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            status:{
                type: DataTypes.ENUM('Alive','Dead','unknown'),
                allowNull: false,
            },
            species: {
                type: DataTypes.STRING,
                allowNull: false
            },
            gender: {
                type: DataTypes.ENUM('Male','Female','Genderless','unknown'),
                allowNull:false
            },
            origin: {
                type:DataTypes.STRING,
                allowNull:false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: false
        }

    )

}