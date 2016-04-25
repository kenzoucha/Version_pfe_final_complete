var User = require(appRoot + '/api/models/User');
var Media = require(appRoot + '/api/models/Media');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var fs = require('node-fs');
var formidable = require('formidable');
var path = require('path');

module.exports = function(router,passport) {
    router
        .use(bodyParser.urlencoded({extended: false}))
        .post('/login',function (req, res) {
            if(req.isAuthenticated()){
                return res.send({status: 'success', message: 'Vous ete deja connecté'});
            }
            passport.authenticate('local-login-front', function(err, user, info){
                if(!user) {
                    return res.status(401).send({status: 'error', message: 'Impossible de se connecter'});
                }
                else{
                    req.logIn(user, function(err){
                        if(err){
                            return res.status(401).send({status: 'error', title:'information',message: 'Impossible de se connecter'});
                        }
                        return res.send({status: 'success', message: 'Vous ete bien connecté'});
                    });
                }
            })(req,res);
    });
    router
        .post('/register', function (req, res) {
                passport.authenticate('local-register-front', function(err, user, info){
                    if(!user) {
                        return res.send({status: 'info', title: 'Information', message: 'Ce compte existe deja'});
                    }
                    else{
                        return res.send({status: 'success', title: 'Inscription', message: 'Votre ete inscrit . L\' activation est prévu dans 24 heures'});
                    }
                })(req,res);
         });
    router
        .get('/session', function(req, res){
            if(req.isAuthenticated()){
                User.findById(req.user._id)
                    .populate({
                        path: '_imageId',
                        select: 'name'
                    })
                    .exec(function(err, user){
                        if(user){
                            return res.status(200).send(user);
                        }
                    })
            }else{
                res.status(401).send({status: 401, message: 'vous pouvez pas  accéder  a cette page'});
            }
        })
    router
        .get('/logout', function(req, res){
            if(req.isAuthenticated()){
                req.logOut();
                return res.send({status: 'success', message: 'déconnexion avec succès'});
            }
            return;
        })
    router
        .post('/upload', function(req, res){
            var userId = null;
            if(req.isAuthenticated()){
                userId = req.user._id;
            }else{
                return res.send(401, {status: 401, message: 'vous pouvez pas  accéder  a cette page'});
            }
            var form = new formidable.IncomingForm();
            form.uploadDir = path.join(appRoot, '/public/uploads');
            form.multiples = true;
            var fileName = null;
            form.on('file', function(field, file){
                fileName =  userId + '-' + file.name;
                fs.rename(file.path, path.join(form.uploadDir, fileName));
            })
            form.on('error', function(err){
                res.send('An error has occured in upload image');
            });

            form.on('end', function(){
                User.findOne({_id: userId}, function(err, user){
                    if(user._imageId){
                        Media.findById(user._imageId, function(err, m){
                            if(m){
                                m.remove(function(err){
                                    if(err){
                                        console.log('impossible de désattacher la photo');
                                    }else{
                                        fs.unlinkSync(path.join(appRoot, 'public/uploads/'+ m.name));
                                    }
                                })
                            }
                        })
                    }
                    var image = new Media({
                        name    : fileName,
                        _userId : user._id
                    });
                    image.save(function(err, image){
                        if(image){
                            User.findById(req.user._id)
                                .populate({
                                    path: '_imageId',
                                    select: 'name'
                                })
                                .exec(function(err, user){
                                    if(user){
                                        return res.status(200).send(user);
                                    }
                                })
                        }
                    });
                    })
                })
            form.parse(req);
        })
}