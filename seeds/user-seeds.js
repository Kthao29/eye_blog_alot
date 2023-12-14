const { User } = require('../models');

const userData = [{
        username: 'World',
        email: 'helloworld@gmail.com',
        password: 'Iloveworld'
    },
    {
        username: 'Earth',
        email: 'helloearth@gmail.com',
        password: 'Iloveearth'
    },
    {
        username: 'Sun',
        email: 'hellosun@gmail.com',
        password: 'Ilovesun'
    }
];

const seedUsers = () => User.bulkCreate(userData, {individualHooks: true});

module.exports = seedUsers;