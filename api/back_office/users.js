var User = require('../models/User');
var nodemailer = require('nodemailer');

module.exports = function(router) {
    router
        .route('/user')
        .get(function (req, res) {
            User
                .find()
                .where('role').equals('user')
                .exec(function (error, users) {
                    res.send(200,users)
                });
        });
    router
        .param('id', function (req, res, next) {
            req.dbQuery = {id: req.params.id};
            next();
        })
        .route('/user/:id')
        .put(function (req, res) {
            console.log(req.dbQuery);
            User
                .findById(req.dbQuery.id)
                .exec(function (error, user) {
                    if(!user){
                        return res.send(404,{status: 'error', message: 'utilisateur non trouver'});
                    }
                    user.activated = true;
                    user.save(function(error, u){
                        var transporter = nodemailer.createTransport({
                            port: 1025,
                            ignoreTLS: true
                        });

                        var mailOptions = {
                            from: '"Kenza" <kenza@gmail.com>',
                            to: u.email,
                            subject: 'Activation Compte ',
                            text: 'Votre compte a  été activé ',
                            html: '<b>Votre compte a été activé</b> <a href="http://localhost:3000/front/#/login">cliquez ici</a>'
                        };

                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                return console.log(error);
                            }
                            console.log('Message sent: ' + info.response);
                        });
                        return res.send(200, {status: 'success', message: 'le compte a  été activé', user: u});
                    })
                });
        })


        .post(function (req, res) {
            console.log(req.dbQuery);
            User
                .findById(req.dbQuery.id)
                .exec(function (error, user) {
                        var mailOptions = {
                            from: '"Kenza" <kenza@gmail.com>',
                            to: u.email,
                            subject: 'Activation Compte ',
                            text: 'Votre compte a  été activé ',
                            html: '<b>Votre compte a été activé</b> <a href="http://localhost:3000/front/#/login">cliquez ici</a>'
                        };

                        transporter.sendMail(mailOptions, function(error, info){
                            if(error){
                                return console.log(error);
                            }
                            console.log('Message sent: ' + info.response);
                        });
                        return res.send(200, {status: 'success', message: 'le compte a  été activé', user: u});
                    })
                });


    router
        .route('/responsable')
        .post(function (req, res) {
            console.log(req.body.username);
            console.log(req.body);
            var user = new User({

                username: req.body.username,
                email: req.body.email,
                role:req.body.role,
                activated:true,
            });
            user.save(function(err,user){
                if(!err){
                    return res.send({status: 'success', message: ' ajout avec succès', user:user})
                }
                else{
                    return res.send({status: 'error', message: 'Impossible d\'ajouter cet responsable'});
                }
            });
        })
    router
        .route('/responsable/:id')
        .get(function (req, res) {
            User.findOne({_id:req.dbQuery.id}, function(err, pc) {
                if(!pc) {
                    res.statusCode = 404;
                    return res.json({ error: 'Not found' });
                }

                if(!err) {
                    return res.json(pc);
                } else {

                    res.statusCode = 500;
                    console.log('Internal error(%d): %s', res.statusCode, err.message);
                    return res.send({ error: 'Server error' });
                }
            });
        })
        .put(function(req, res){
            User.findOne({_id:req.dbQuery.id}, function(error, user) {
                if(! user) {
                    return res.send({status: 'error', message: 'responsable n\'existe pas'});
                }
                else{
                    user.username = req.body.username;
                    user.save(function(err, use){
                        if(!err){
                            res.send({status: 'success', message: 'responsable modifié avec succès', use:use})
                        }else{
                            console.log(err);
                            return false;
                        }
                    });
                }
            });
        })
        .delete(function (req, res) {
            User.findOne({_id:req.dbQuery.id}, function(err, users) {
                if(!users) {
                    return res.send({status: 'error', message: 'responsable n\'existe pas'});
                }
                users.remove(function(err) {
                    if(!err) {
                        return res.send({status: 'success', message:'responsable a été supprimé'});
                    }
                })
            });

        })

    router
        .get('/getUsers', function(req, res){
            User
                .find()
                .where('activated').equals(false)
                .exec(function (error, users) {
                    res.send(200,users.length);
                });
          //  res.send({'count': req.isAuthenticated()});
        })
    router
        .route('/role')
        .get(function (req, res) {
            User.find({$or: [{'role': 'rv'},{'role': 'rl'}]})
                .exec(function(err, user){
                    res.send(200,user)
                });


        })


    router
        .route('/profile/:id')
        .get(function (req, res) {
            User.findOne({_id:req.dbQuery.id}, function(err, pc) {
                if(!pc) {
                    res.statusCode = 404;
                    return res.json({ error: 'Not found' });
                }

                if(!err) {
                    return res.json(pc);
                } else {

                    res.statusCode = 500;
                    console.log('Internal error(%d): %s', res.statusCode, err.message);
                    return res.send({ error: 'Server error' });
                }
            });
        })
        .put(function(req, res){
            User.findOne({_id:req.dbQuery.id}, function(error, users) {
                if(! users) {
                    return res.send({status: 'error', message: 'profile n\'existe pas'});
                }
                else{
                    users.tel = req.body.tel;
                    users.birthdate = req.body.birthdate;
                    users.save(function(err, use){
                        if(!err){
                            res.send({status: 'success', message: 'profile modifié avec succès', use:use})
                        }else{
                            console.log(err);
                            return false;
                        }
                    });
                }
            });
        })
}