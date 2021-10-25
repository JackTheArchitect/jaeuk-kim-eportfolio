let mongoose = require('mongoose');

// Create a model class
let businessContactModel = mongoose.Schema(
    {
        name: String,
        number: String,        
        email: String
    },
    {
        collection: "businessContact"
    }
);

module.exports = mongoose.model('businessContact', businessContactModel);
// module.exports = mongoose.model('businessContact', businessContactModel);