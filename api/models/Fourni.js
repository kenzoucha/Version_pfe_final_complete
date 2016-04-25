
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Fourni = Schema({

    firstname   :  String,
    lastname   :  String,
    pays    :  String,
 ville   :  String,
   tel    :Number,
    debutabon: [{type:Date, default: '12/12/1999'}],
    finabon:[{type:Date, default: '12/12/1999'}],
});
module.exports = mongoose.model('Fourni', Fourni);