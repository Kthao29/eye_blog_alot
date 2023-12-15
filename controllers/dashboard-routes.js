//import the required packages
const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//get all blogs
router.get('/', withAuth, (req, res) => {

  Blog.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'body',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(blogData => {
      const blogs = blogData.map(blog => blog.get({ plain: true }));
      res.render('dashboard', { blogs, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//able to make edits to a specific blog
router.get('/edit/:id', withAuth, (req, res) => {
  Blog.findByPk(req.params.id, {
    attributes: [
      'id',
      'title',
      'body',
      'created_at',
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(blogData => {
      if (blogData) {
        const blog = blogData.get({ plain: true });
        
        res.render('edit-blog', {
          blog,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;