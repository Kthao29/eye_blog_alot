const router = require('express').Router();
const {  Comment  } = require('../../models');
const withAuth = require('../../utils/auth');

//get all comments
router.get('/', (req, res) => {
    Comment.findAll({})
    .then(commentData => res.json(commentData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//creating a comment withAuth, making sure user is logged in before being able to make comments
router.post('/', withAuth, (req, res) => {
    if (req.session) {
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.session.user_id,
    blog_id: req.body.blog_id
  })
    .then(commentData => res.json(commentData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });}
});

//making changes to a specific comment w/id and withAuth, making sure user is logged in before being able to make changes
router.put('/:id', withAuth, (req, res) => {
  Comment.update(
    {
      comment_text: req.body.comment_text,
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(commentData => {
      if (!commentData) {
        res.status(404).json({ message: 'No blog found' });
        return;
      }
      res.json(commentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//deleting a specific comment w/id and withAuth, making sure user is logged in before being able to delete comment
router.delete('/:id', withAuth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(commentData => {
      if (!commentData) {
        res.status(404).json({ message: 'No comment found' });
        return;
      }
      res.json(commentData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//export all of these into router
module.exports = router;