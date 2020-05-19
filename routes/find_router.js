const {Router} = require('express');
const find_router = Router();

const Employee = require('../models/Employee');

find_router.get('/workers', (req, res) => {
    const stream =  Employee.find().stream();
    const emps = [];     //TODO how long?

    stream.on('data', function (doc) {
        emps.push(doc);   //TODO need to check length, if it's OK then push
    });
    stream.on('error', function (err) {
        console.log(err);
    });

    stream.on('end', function () {
        console.log('All done!');
        res.render('workers',{
            title: 'Workers',
            emps:emps
        });
    });
});



module.exports = find_router;