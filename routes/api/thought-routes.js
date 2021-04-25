const router = require('express').Router();
const { 
    addThought, 
    updateThought, 
    removeThought,
    getAllThoughts,
    getThoughtById } = require('../../controllers/thought-controllers')

router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);
router
    .route('/:userId/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

module.exports = router;