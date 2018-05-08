var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SupplierSchema = new Schema({
	name: String,
	owner: String,
	address: {
		street: String,
		zip: String,
		state: String
	}
});

module.exports = mongoose.model('Supplier', SupplierSchema);
