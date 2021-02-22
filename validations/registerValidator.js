const fs = require('fs');
const {check, body} = require('express-validator');
const users_db = JSON.parse(fs.readFileSync('./data/users.json','utf-8'));


module.exports = [
    check('username')
    .notEmpty().withMessage('El nombre de usuario es requerido'),

    check('email')
    .isEmail().withMessage('El email debe ser válido'),

    body('email').custom(value => {
        let result = users_db.find(user => user.email === value);
        if(result){
            return false
        }else{
            return true
        }
    }).withMessage('El email ya está registrado!'),

    check('pass')
    .notEmpty().withMessage('La constraseña es requerida')
    .isLength({
        min: 6,
        max : 12
    }).withMessage('La contraseña debe tener un min: 6  un max:12'),

    body('pass2').custom((value,{req}) => {
        if(value !== req.body.pass){
            return false
        }else{
            return true
        }
    }).withMessage('Las contraseñas no coinciden!!')
]