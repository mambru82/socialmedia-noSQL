const router = require('express').Router();
const { 
    addThought, 
    updateThought, 
    removeThought,
    getAllThoughts,
    getThoughtById,
    addReaction,
    removeReaction } = require('../../controllers/thought-controllers')

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);
router
    .route('/:userId/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);
router
    .route('/:userId/:thoughtId/reactions')
    .put(addReaction)
router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction)

module.exports = router;