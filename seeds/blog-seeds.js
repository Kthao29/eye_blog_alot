const { Blog } = require('../models');

//test for the blog data
const blogData = [{
        title: 'Hello world',
        body: 'We all come together',
        user_id: 1
    },
    {
        title: 'Hello Earth',
        body: 'We all live here',

        user_id: 2
    },
    {
        title: 'Hello Sun',
        body: 'We need you',

        user_id: 3
    }
];

const seedBlogs = () => Blog.bulkCreate(blogData);

module.exports = seedBlogs;