const {Router} = require('express');
const find_router = Router();

const Employee = require('../models/Employee');

find_router.get('/getall', (req, res) => {
    const stream =  Employee.find().stream();

    stream.on('data', function (doc) {
        console.log(doc);
    });
    stream.on('error', function (err) {
        console.log(err);
    });
    stream.on('end', function () {
        console.log('All done!');
    });
});


module.exports = find_router;