const router = require('express').Router();
const thoughtRoutes = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/thougts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;
