var express = require('express');
var router = express.Router();

//Changed For Assignment2
let bsContactController = require('../controller/businessContact');

// Sample Code
let inventoryController = require('../controller/inventory');


// Connect to our model
// let Inventory = require('../models/inventory'); ==> Not used even in the sample codes


// helper function for guard purposes
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if(!req.isAuthenticated())
    {
        req.session.url = req.originalUrl;        
        return res.redirect('/users/signin');
    }
    next();
}


//Changed For Assignment2


/* GET list of items */
// router.get('/list', bsContactController.bsContactList);


// // Routers for edit
// router.get('/edit/:id', requireAuth, bsContactController.displayEditPage);
// router.post('/edit/:id', requireAuth, bsContactController.processEditPage);

// // Delete
// router.get('/delete/:id', requireAuth, bsContactController.performDelete);


// /* GET Route for displaying the Add page - CREATE Operation */
// router.get('/add', requireAuth, bsContactController.displayAddPage);

// /* POST Route for processing the Add page - CREATE Operation */
// router.post('/add', requireAuth, bsContactController.processAddPage);

// module.exports = router;




// Sample Code

/* GET list of items */
router.get('/list', inventoryController.inventoryList);

// Routers for edit
router.get('/edit/:id', requireAuth, inventoryController.displayEditPage);
router.post('/edit/:id', requireAuth, inventoryController.processEditPage);

// Delete
router.get('/delete/:id', requireAuth, inventoryController.performDelete);


/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', requireAuth, inventoryController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', requireAuth, inventoryController.processAddPage);

module.exports = router;