var express = require('express');
var router = express.Router();

const {register, processRegister,login, processLogin, profile,logout} = require('../controllers/usersController');

/* middlewares */
const uploadImages = require('../middlewares/uploadImages');
const registerValidator = require('../validations/registerValidator');
const loginValidator = require('../validations/loginValidator');
const userCheck = require('../middlewares/userCheck');

router.get('/register',register);
router.post('/register',uploadImages.any(),registerValidator, processRegister);

router.get('/login',login);
router.post('/login', loginValidator, processLogin);

router.get('/profile',userCheck, profile);

router.get('/logout',logout);


module.exports = router;
