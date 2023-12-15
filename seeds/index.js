const sequelize = require('../config/connection');

//const all the different seeds to be tested
const seedUsers = require('./user-seeds');
const seedBlogs = require('./blog-seeds');
const seedComments = require('./comment-seeds');


const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();
    await seedBlogs();
    await seedComments();
    process.exit(0);
};

seedAll();