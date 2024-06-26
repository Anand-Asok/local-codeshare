const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite'
});

const Session = sequelize.define('Session', {
    room: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    code: {
        type: DataTypes.TEXT,
        defaultValue: ''
    }
});

sequelize.sync();

module.exports = {
    Session,
    sequelize
};
