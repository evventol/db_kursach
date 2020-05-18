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


find_router.get('/workers', (req, res) => {
    res.render('workers',{
        title: 'Workers'
    })
});


module.exports = find_router;