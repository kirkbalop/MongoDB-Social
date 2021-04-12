const router = require('express').Router();
const { addThought, removeThought, updateThought, addReaction, removeReaction, getAllThought, getThoughtById } = require('../../controllers/thought-controllers');
const { route } = require('./user-routes');

// api/thoughts
router
    .route('/')
    .get(getAllThought)
    .post(addThought);

// api/thoughts/<thoughtId>
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// api/thoughts/<thoughtId>/<reactionId>
router
    .route('/:id/reactions')
    .post(addReaction);

router
    .route('/:id/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;