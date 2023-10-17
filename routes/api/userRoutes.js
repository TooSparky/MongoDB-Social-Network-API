const router = require('express').Router();
const {} = require('../../controllers/userController');

// api/users
router.route('/').get().get().post().put().delete();

// api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').post().delete();

module.exports = router;
