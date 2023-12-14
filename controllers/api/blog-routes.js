const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
 const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
  
  Blog.findAll({
    attributes: [
      'id',
      'title',
      'body',
      'created_at',
    ],
    order: [['created_at', 'DESC']],
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
    .then(blogData => res.json(blogData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  Blog.findOne({
    where: {
      id: req.params.id
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
      if (!blogData) {
        res.status(404).json({ message: 'No blog found' });
        return;
      }
      res.json(blogData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  Blog.create({
    title: req.body.title,
    body: req.body.body,
    user_id: req.session.user_id
  })
    .then(blogData => res.json(blogData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
  Blog.update(
    {
      title: req.body.title,
      body: req.body.body
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(blogData => {
      if (!blogData) {
        res.status(404).json({ message: 'No blog found' });
        return;
      }
      res.json(blogData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  console.log('id', req.params.id);
  Blog.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(blogData => {
      if (!blogData) {
        res.status(404).json({ message: 'No blog found' });
        return;
      }
      res.json(blogData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;