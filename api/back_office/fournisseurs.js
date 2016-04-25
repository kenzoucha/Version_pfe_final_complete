
var Fourni = require('../models/Fourni');
module.exports = function(router) {

    router
        .route('/fourni')
        .get(function (req, res) {
            Fourni
                .find()
                .exec(function (error, fourni) {
                    if (error) {
                        console.log('Error: ' + error);
                    } else {
                        res.json(fourni);
                    }
                });
        })
        .get(function (req, res) {
            Fourni.findOne({_id:req.dbQuery.id}, function(err, pc) {
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
    .post(function (req, res) {

        var fourni = new Fourni({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            tel: req.body.tel,
            ville: req.body.ville,
            pays: req.body.pays,
            debutabon: req.body.debutabon,
            finabon: req.body.finabon,

        });
        fourni.save(function(err, four){
            if(!err){
                return res.send({status: 'success', message: ' ajout avec succès', four:four})
            }
            else{
                return res.send({status: 'error', message: 'Impossible d\'ajouter cet fournisseur'});
            }
        });
    })
    router

        .param('id', function (req, res, next) {

            req.dbQuery = {id: req.params.id};
            next();
        })
        .route('/fourni/:id')
        .get(function (req, res) {
            Fourni.findOne({_id:req.dbQuery.id}, function(err, pc) {
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
        Fourni.findOne({_id:req.dbQuery.id}, function(error, fourni) {
            if(!fourni) {
                return res.send({status: 'error', message: 'fournisseur n\'existe pas'});
            }
            else{
                fourni.firstname = req.body.firstname;
                fourni.lastname= req.body.lastname;
                fourni.save(function(err, four){
                    if(!err){
                        res.send({status: 'success', message: 'fournisseur modifié avec succès', four:four})
                    }else{
                        console.log(err);
                        return false;
                    }
                });
            }
        });
    })

        .delete(function (req, res) {
            Fourni.findOne({_id:req.dbQuery.id}, function(err, fourni) {
                if(!fourni) {
                    return res.send({status: 'error', message: 'fournisseur n\'existe pas'});
                }
                fourni.remove(function(err) {
                    if(!err) {
                        return res.send({status: 'success', message:'fournisseur a  été supprimé'});
                    }
                })
            });

        })
}