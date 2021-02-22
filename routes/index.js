var express = require('express');
var router = express.Router();

const {index,admin} =require('../controllers/indexController');

const adminCheck = require('../middlewares/adminCheck');

/* GET home page. */
router.get('/', index);

router.get('/admin', adminCheck, admin)

module.exports = router;
