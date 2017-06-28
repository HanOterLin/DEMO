const Sequelize = require('sequelize');
const uuid = require('uuid');

const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/test');

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

demo.sync({force: false})
    .then(() => {
        // demo.create(
        //     {
        //     firstName: 'ddd',
        //     }
        // )
        demo.update({
            uuid: 'ddd',
        }, {
            where: {
                firstName: ddd,
            }
        })
            .then((res) => {
                console;
            })
            .catch(err => {
                console.dir(err);
            });
    })
    .catch(err => {
        console.dir(err);
    });

