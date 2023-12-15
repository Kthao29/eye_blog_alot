
const { Comment } = require('../models');

//test for the comment section
const commentData = [{
        comment_text: "I really like your idea!!! Give me MORE!!!",
        user_id: 1,
        blog_id: 1
    },
    {
        comment_text: "This is VERY INTERESTING! COOLLLL!!!",
        user_id: 2,
        blog_id: 2
    },
    {
        comment_text: "Nah, could use some work for this...",
        user_id: 3,
        blog_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;