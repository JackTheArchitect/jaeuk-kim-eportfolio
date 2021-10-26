// create a reference to the model
let Inventory = require('../models/inventory');



module.exports.inventoryList = function(req, res, next) {  
    Inventory.find((err, inventoryList) => {
        console.log(inventoryList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            
            // Sort the names Alphabetically ! - Assignment 2          

            let tempName = [];            
            let nameInOrder = [];            
            let idContainer;
            
            for (var i=0; i<inventoryList.length; i++) {
                tempName[i] = inventoryList[i].item;
                // nameInOrder[i] = tempName[i];
                // idContainer = inventoryList[i].id;                
            };
            
            for (var i=0; i<tempName.length; i++) {
                nameInOrder[i] = tempName.sort()[i];
            };

            for (var i=0; i<nameInOrder.length; i++) {
               inventoryList[i].item = nameInOrder[i];
            }
            
            

            
            res.render('inventory/list', {
                title: 'Contact List', 
                InventoryList: inventoryList,
                userName: req.user ? req.user.username : ''
            })            
        }
    });
}

module.exports.displayEditPage = (req, res, next) => {
    
    let id = req.params.id;

    Inventory.findById(id, (err, itemToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('inventory/add_edit', {
                title: 'Update Contact', 
                item: itemToEdit,
                userName: req.user ? req.user.username : ''
            })
        }
    });
}

module.exports.processEditPage = (req, res, next) => {

    let id = req.params.id

    let updatedItem = Inventory({
        _id: req.body.id,
        item: req.body.item,
        qty: req.body.qty,
        status: req.body.status,
        
    });

    Inventory.updateOne({_id: id}, updatedItem, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/inventory/list');
        }
    });

}

module.exports.performDelete = (req, res, next) => {

    let id = req.params.id;


    Inventory.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/inventory/list');
        }
    });

}


module.exports.displayAddPage = (req, res, next) => {

    let newItem = Inventory();

    res.render('inventory/add_edit', {
        title: 'Add Contact',
        item: newItem,
        userName: req.user ? req.user.username : ''
    })          

}

module.exports.processAddPage = (req, res, next) => {

    let newItem = Inventory({
        _id: req.body.id,
        item: req.body.item,
        qty: req.body.qty,
        status: req.body.status,
        
    });

    Inventory.create(newItem, (err, item) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            console.log(item);
            res.redirect('/inventory/list');
        }
    });
    
}
