
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Adress= new Schema({

    lastname: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    societe: {
        type: String,
        require: true
    },
    pays: {
        type: String,
        require: true
    },
    ville: {
        type: String,
        require: true
    },
    codepostal: {
        type: String,
        require: true
    },
//  User      : [{type: Schema.Types.ObjectId, ref: 'users'}]
});
module.exports = mongoose.model('Adress',Adress);