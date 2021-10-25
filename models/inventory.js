let mongoose = require('mongoose');

// Create a model class
let inventoryModel = mongoose.Schema(
    {
        item: String,
        qty: String,        
        status: String        
    },
    {
        collection: "businessContact"
    }
);

module.exports = mongoose.model('Inventory', inventoryModel);

// //Sample Code
// let inventoryModel = mongoose.Schema(
//     {
//         item: String,
//         qty: Number,
//         tags: [],
//         status: String,
//         size: {
//             h: Number,
//             w: Number,
//             uom: String
//         }
//     },
//     {
//         collection: "inventory"
//     }
// );

// module.exports = mongoose.model('Inventory', inventoryModel);