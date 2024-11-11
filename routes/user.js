const exprsss = require('express');
const { handleUserSignup , handleUserLogin } = require('../controllers/user');

const router = exprsss.Router();

router.post('/' , handleUserSignup); 
router.post('/login' , handleUserLogin); 


module.exports = router;