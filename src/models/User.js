const {DataTypes} = require("sequelize")


module.exports = (database)=>{
    database.define(
        'User',
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            email:{
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate:{isEmail:true}
            },
            password:{
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            timestamps: false
        }

    )

}