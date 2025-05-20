const { Router } = require('express');
const router = Router();
const userRoutes = require('./userRoutes')
const accountRoutes = require('./accountsRoute');



router.use('/user' , userRoutes);
router.use('/accounts' , accountRoutes);


module.exports = router;