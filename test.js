const Sequelize = require('sequelize');
const uuid = require('uuid');

const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/test');

const Customer = sequelize.define('customer', {

    customer: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
        validate: {
            isNumeric: true
        }
    },
    first_name: {
        type: Sequelize.STRING(100),
        validate: {
            isAlphanumeric: true
        }
    },
    last_name: Sequelize.STRING(100),
    identity_code: {
        type: Sequelize.STRING(20),
        allowNull: true,
        validate: {
            isNumeric: true
        }
    },
    note: Sequelize.STRING(1000),
    birth_date: Sequelize.DATE,


    created_by: Sequelize.INTEGER,
    updated_by: Sequelize.INTEGER,

    cst_type: Sequelize.INTEGER,
    cst_state_type:  {
        type: Sequelize.INTEGER,
    }

}, {
    tableName: 'customer',

    updatedAt: 'updated',
    createdAt: 'created',
    timestamps: true
});

const StateType = sequelize.define('StateType', {

    cst_state_type: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate: {
        }
    },
    name: Sequelize.STRING(100),
}, {
    tableName: 'cst_state_type',
    timestamps: false
});


Customer.belongsTo(StateType, {
    foreignKey: 'cst_state_type',
    as: 'state_type'
});

StateType.hasMany(Customer, {
    foreignKey: 'cst_state_type'
});


Customer.findAll( {
    include: [
        { model: db.Address, as: 'addresses' },
        { model: db.StateType, as: 'state_type' }
    ]
})
    .success(function (customers) {
        res.json(200, customers);
    })
    .fail(function (error) {
        res.json(500, { msg: error });
    });

StateType.schema('public');

Customer.schema('public');

StateType.sync({force: true})
    .then(() => {
        // demo.create(
        //     {
        //     firstName: '',
        //     }
        // )
        //     .then((res) => {
        //         console;
        //     })
        //     .catch(err => {
        //         console.dir(err);
        //     });
    })
    .catch(err => {
        console.dir(err);
    });

Customer.sync({force: true})
    .then(() => {
        // demo.create(
        //     {
        //     firstName: '',
        //     }
        // )
        //     .then((res) => {
        //         console;
        //     })
        //     .catch(err => {
        //         console.dir(err);
        //     });
    })
    .catch(err => {
        console.dir(err);
    });
