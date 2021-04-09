const router = require('express').Router();
const { addThought, removeThought, addReaction, removeReaction } = require('../../controllers/thought-controllers');
const { route } = require('./user-routes');

// api/thoughts
router
    .route('/thoughts')
    .post(addThought);

// api/thoughts/<thoughtId>
router
    .route('/thoughts/:thoughtId')
    // put
    .delete(removeThought);

// api/thoughts/<thoughtId>/<reactionId>
router
    .route('/thoughts/:thoughtId/reactions')
    .post(addReaction);

router
    .route('/thoughts/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;