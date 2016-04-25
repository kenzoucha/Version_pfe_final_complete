var Panier = require('../models/Panier');
var  Product = require('../models/Product');
function getAllPaniers(req,res){
    Panier.find(function(err, products) {
        if(!err) {
            return res.json(products);
        } else {
            res.statusCode = 500;
            console.log('Internal error(%d): %s',res.statusCode,err.message);
            return res.json({ error: 'Server error' });
        }
    });
};


module.exports = function(router){
    router
        .route('/panier')
        .get(function (req, res) {
            getAllPaniers(req, res);
        })
        .post(function (req, res) {
           console.log("*******",req.body);
            var panier = new Panier({
                _productId       : req.body.productId,
                _userId       :  req.body.userId,

            });
            panier.save(function(err, pan){
                if(!err){
                    res.send({status: 'success', message: 'Panier ajouter avec succès', pan:pan})
                }
                else{
                    res.send({status: 'error', message: 'Impossible d\'ajouter cette panier'});
                }
            });
        });
    router
    .route('/panier/:id')
        .get(function (req, res) {
            Panier.findOne({_id:req.dbQuery.id}, function(err, pc) {
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

    router
        .route('/panierByUser/:id')
        .get(function (req, res) {

            Panier
                .find()
                .where('_userId').equals(req.dbQuery.id)
                .exec(function (error, response) {
                    res.send({status: 'success', message: 'Panier ajouter avec succès', pan:response});
                });

        })
}