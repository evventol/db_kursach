const {Router} = require('express');
const Employee = require('../models/Employee');
const router = Router();

router.get('/', async (req, res) => {
    const stream = await Employee.find().stream();

    stream.on('data', function(doc) {
        console.log(doc);
    });
    stream.on('error', function(err) {
        console.log(err);
    });
    stream.on('end', function() {
        console.log('All done!');
    });

});








module.exports = router;