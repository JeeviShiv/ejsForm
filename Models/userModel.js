var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var userModel = new Schema({
    firstName: { type: String},
    lastName: { type: String},
    email: { type: String},
    address: { type: String},
    products: [{}],
    orderedDate: {
		type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('user', userModel, 'userInfo');