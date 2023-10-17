const router = require('express').Router();
const {} = require('../../controllers/thoughtController');

// api/thougts
router.route('/').get().get().post().put().delete();

// api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post().delete();

module.exports = router;
