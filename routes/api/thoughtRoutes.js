const router = require('express').Router();
const {
    getThoughts,
    singleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

// api/thougts
router.route('/').get(getThoughts).post(createThought);

// api/thoughts/:thoughtId
router.route('/:thoughtId').get(singleThought).put(updateThought).delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;
