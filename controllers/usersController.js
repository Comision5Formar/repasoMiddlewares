const fs = require('fs');
const bcrypt = require('bcrypt');

const users_db = JSON.parse(fs.readFileSync('./data/users.json','utf-8'));

const {validationResult} = require('express-validator');

module.exports = {
    register : (req,res) => {
        res.render('register')
    },
    processRegister : (req,res) => {

        let errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.render('register',{
                errores : errores.errors
            })
        }else{
            const {username, email, pass} = req.body;

            let lastID = 0;
            users_db.forEach(user => {
                if (user.id > lastID) {
                    lastID = user.id
                }
            });
        
            const passHash = bcrypt.hashSync(pass,12);
        
            const newUser = {
                id : +lastID + 1,
                username,
                email,
                pass : passHash,
                avatar : req.files[0].filename || 'sin avatar',
            }
        
            users_db.push(newUser);
            fs.writeFileSync('./data/users.json',JSON.stringify(users_db,null,2),'utf-8');
        
            res.redirect('/users/login');
        }
    },
    login : (req,res) => {
        res.render('login')
    },
    processLogin : (req, res) => {
        let errores = validationResult(req);

        const {email, pass, recordar} = req.body;
        
        if(!errores.isEmpty()){
            res.render('login',{
                errores : errores.errors
            })
        }else{
            let result = users_db.find(user => user.email === email);

            if(result){
                if(bcrypt.compareSync(pass.trim(), result.pass)){

                    req.session.user = {
                        id : result.id,
                        username : result.username,
                        avatar : result.avatar,
                        rol: result.rol
                    }

                    if(recordar){
                        res.cookie('userComision5',req.session.user,{
                            maxAge : 1000 * 60
                        })
                    }

                    res.redirect('/users/profile')
                }
            }
            res.render('login', {
                errores : [
                    {
                        msg : "credenciales inválidas"
                    }
                ]
            })
        }
    },
    profile : (req,res) => {
        res.render('profile')
    },
    logout : (req,res) => {
        req.session.destroy();
        if(req.cookies.userComision5){
            res.cookie('userComision5','',{maxAge:-1})
        }
        res.redirect('/')
    }
}