
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  relationship = require('mongoose-relationship');

var Panier = new Schema({
  _productId       : [{type: Schema.Types.ObjectId, ref: 'Product', childPath:'Panier'}],
  _userId       : [{type: Schema.Types.ObjectId, ref: 'User',childPath:'Panier'}],

});
Panier.plugin(relationship, {relationshipPathName: '_productId'});
Panier.plugin(relationship, {relationshipPathName: '_userId'});

module.exports = mongoose.model('Panier', Panier);
