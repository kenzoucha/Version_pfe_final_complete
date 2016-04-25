var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs');

var User = Schema({
    _imageId     : {type:Schema.ObjectId, ref: 'Media'},
    username    :  String,
    email       :  String,
    password    :  String,
    tel: Number,
    birthdate:String,
    role        : {
        type: String, default: 'user'
    },
    activated   :  {
        type:Boolean, default: false
    }
});

User.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', User);