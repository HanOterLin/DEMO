var Sequelize = require('sequelize');
var uuid = require('uuid');

const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/CERBERUS');

const demo = sequelize.define('business_sponsor_survey', {
    lastName: {
        type: Sequelize.UUID,
        field: 'uuid',
        defaultValue: uuid.v4(),
    },
    firstName: {
        type: Sequelize.STRING,
        field: 'firstName',
    }
}, {
    tableName: 'business_sponsor_survey',
    timestamps: false
});

demo.schema('public');

demo.sync({force: true}).then(() => {
    demo.create({
        firstName: 'ddd',
    });
});

